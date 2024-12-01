import {create} from 'zustand';
import RNFetchBlob from 'rn-fetch-blob';

export interface DownloadElement {
  id: string;
  url: string;
  progress: number;
  setProgress: (written: number, total: number) => void;
}

interface DownloadManagerState {
  queue: DownloadElement[];
  downloadElements: Map<string, DownloadElement>;
  addToQueue: (id: string, url: string) => void;
  getDownloadElementById: (id: string) => DownloadElement | undefined;
}

export const useDownloadManagerStore = create<DownloadManagerState>(
  (set, get) => ({
    queue: [],
    downloadElements: new Map(),

    addToQueue: (id: string, url: string) => {
      const {queue, downloadElements} = get();

      if (downloadElements.has(id)) {
        return;
      }

      // Create a new DownloadElement
      const downloadElement: DownloadElement = {
        id,
        url,
        progress: 0,
        setProgress: (written, total) => {
          downloadElement.progress = (written / total) * 100;
          console.log(
            `Element downloading with id ${id}: ${downloadElement.progress}%`,
          );
          set({
            queue: queue.map(item =>
              item.id === id
                ? {...item, progress: downloadElement.progress}
                : item,
            ),
          });
        },
      };

      // Add to state
      set({
        queue: [...queue, downloadElement],
        downloadElements: new Map(downloadElements).set(id, downloadElement),
      });

      // Start downloading
      startDownload(downloadElement);
    },

    getDownloadElementById: (id: string) => {
      const {downloadElements} = get();
      return downloadElements.get(id);
    },
  }),
);

const startDownload = (downloadElement: DownloadElement) => {
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'mp3',
  })
    .fetch('GET', downloadElement.url)
    .progress((written, total) => {
      downloadElement.setProgress(written, total);
    })
    .then(res => {
      console.log('The file is saved to ', res.path());
    })
    .catch(error => {
      console.error(`Error downloading ${downloadElement.id}:`, error);
    });
};
