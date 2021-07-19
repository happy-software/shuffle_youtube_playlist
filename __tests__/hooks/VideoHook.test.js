import { renderHook, act } from "@testing-library/react-hooks";
import axios from 'axios';
import AppConstants from '../../src/AppConstants';
import useVideoHook from "../../src/hooks/VideoHook";


jest.mock('axios');

const testVideos = [
  {
    "title": "Naughty By Nature - Here Comes The Money",
    "video_id": "TeXatquVqAc",
    "playlist_id": "FL7B_s7wxX-D__fkTiYp3Oaw",
    "description": "No Video,Just The Song",
    "playlist_owner": "Maluhtg"
  }
];

describe('useVideoHook', () => {
  it('fetches data successfully from API', async () => {
    const responseData = {
      data: { 
        songs: testVideos
      }
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(responseData));

    const initialPlaylistIds = []    
    const hookCallback = () => useVideoHook(initialPlaylistIds);
    const { result, waitForNextUpdate } = renderHook(hookCallback);


    const initialHookResult = result.current[0];
    expect(axios.post).toHaveBeenCalledWith(AppConstants.APIEndpoints.SHUFFLE, { playlist_ids: initialPlaylistIds });
    expect(initialHookResult.videos).toEqual([]);
    expect(initialHookResult.isLoaded).toBe(false);
    expect(initialHookResult.isError).toBe(false);

    await waitForNextUpdate();
    const hookResult = result.current[0];
    expect(hookResult.videos).toEqual(testVideos);
    expect(hookResult.isLoaded).toBe(true);
    expect(hookResult.isError).toBe(false);

    // Update the state
    const playlistIds = ['abcd'];
    act(() => {
      const dispatchFunction = result.current[1];
      dispatchFunction(playlistIds);
    })
    expect(axios.post).toHaveBeenCalledWith(AppConstants.APIEndpoints.SHUFFLE, { playlist_ids: playlistIds });

    const hookUpdateResult = result.current[0];
    expect(hookUpdateResult.videos).toEqual([]);
    expect(hookUpdateResult.isLoaded).toBe(false);
    expect(hookUpdateResult.isError).toBe(false);

    await waitForNextUpdate();

    const hookErrorResult = result.current[0];
    expect(hookErrorResult.videos).toEqual([]);
    expect(hookErrorResult.isLoaded).toBe(false);
    expect(hookErrorResult.isError).toBe(true);
  });
});
