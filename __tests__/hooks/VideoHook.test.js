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
const mockResponse = {
  data: { 
    songs: testVideos
  }
};
const mockError = new Error('Error');

describe('useVideoHook', () => {
  it('fetches data successfully from API', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(mockResponse));

    // call the hook using renderHook (it requires a component)
    const initialPlaylistIds = [];
    const { result, waitForNextUpdate } = renderHook(() => useVideoHook(initialPlaylistIds));
    expect(axios.post).toHaveBeenCalledWith(AppConstants.APIEndpoints.SHUFFLE, { playlist_ids: initialPlaylistIds });

    // expect hook state to have been initialized
    let hookResult = result.current[0];
    expect(hookResult.videos).toEqual([]);
    expect(hookResult.isLoaded).toBe(false);
    expect(hookResult.error).toBe(null);
    expect(hookResult.isError).toBe(false);

    // expect hook state to have been updated
    await waitForNextUpdate();
    hookResult = result.current[0];
    expect(hookResult.videos).toEqual(testVideos);
    expect(hookResult.isLoaded).toBe(true);
    expect(hookResult.error).toBe(null);
    expect(hookResult.isError).toBe(false);

    // Update the state
    axios.post.mockImplementationOnce(() => Promise.reject(mockError));
    const updatedPlaylistIds = ['abcd'];
    act(() => {
      const dispatchFunction = result.current[1];
      dispatchFunction(updatedPlaylistIds);
    })
    expect(axios.post).toHaveBeenCalledWith(AppConstants.APIEndpoints.SHUFFLE, { playlist_ids: updatedPlaylistIds });
    
    // expect hook state to have been initialized
    hookResult = result.current[0];
    expect(hookResult.videos).toEqual([]);
    expect(hookResult.isLoaded).toBe(false);
    expect(hookResult.error).toBe(null);
    expect(hookResult.isError).toBe(false);

    // expect hook state to have been updated due to error
    await waitForNextUpdate();
    hookResult = result.current[0];
    expect(hookResult.videos).toEqual([]);
    expect(hookResult.isLoaded).toBe(false);
    expect(hookResult.error).toStrictEqual(mockError);
    expect(hookResult.isError).toBe(true);
  });
});
