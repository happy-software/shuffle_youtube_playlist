import React from 'react';
import axios from 'axios';
import AppConstants from './AppConstants';
import Checkbox from './Checkbox';

class PlaylistSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            playlists_selected: [],
            checkedItems: new Map(),
        }
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }
    componentDidMount() {
        console.log(`Loading PlaylistSelector`);
        axios.get(AppConstants.APIEndpoints.TRACKED_PLAYLISTS)
            .then(response => {
                console.log(response);
                this.setState({playlists: response.data});
            })
            .catch((e) => console.log(`Couldn't retrieve tracked playlists! ${e}`));

    }

    toggleCheckbox(playlist_id) {
        const prevSelectedValue = !!this.state.checkedItems.get(playlist_id);

        this.setState(prevState => ({ 
            checkedItems: prevState.checkedItems.set(playlist_id, !prevSelectedValue) 
        }), () => {
            console.log(this.state.checkedItems);
            
            const playlistIDs = 
                Array.from(this.state.checkedItems)
                .filter(playlist => playlist[1] == true)
                .map(playlist => playlist[0])
                .join(', ');

            console.log(playlistIDs);
        });
    }

    render() {
        return (
            <div id="playlistSelector" style={this.props.style}>
                <div><b>Tracked Playlists</b></div>
                {this.state.playlists.map(p =>
                    <Checkbox
                    label={p.name}
                    value={p.playlist_id}
                    handleCheckboxChange={this.toggleCheckbox}
                    />
                )}
            </div>
        );
    }
}

export default PlaylistSelector;