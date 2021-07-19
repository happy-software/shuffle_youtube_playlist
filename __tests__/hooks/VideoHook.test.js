import { renderHook } from "@testing-library/react-hooks";
import axios from 'axios';
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

    const initialPlaylistIds = ""    
    const hookCallback = () => useVideoHook(initialPlaylistIds);
    const { result, waitForNextUpdate } = renderHook(hookCallback);

    // State before fetched data
    expect(result.current[0].videos).toEqual([]);
    expect(result.current[0].isLoaded).toBe(false);
    expect(result.current[0].isError).toBe(false);

    await waitForNextUpdate();

    // State after fetched data
    expect(result.current[0].videos).toEqual(testVideos);
    expect(result.current[0].isLoaded).toBe(true);
    expect(result.current[0].isError).toBe(false);
  });
});
