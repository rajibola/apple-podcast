import {create} from 'zustand';
import RNFetchBlob from 'rn-fetch-blob';
import {getAudioMetadata} from '@missingcore/audio-metadata';

export interface DownloadElement {
  id: string;
  url: string;
  progress: number;
  setProgress: (written: number, total: number) => void;
}

export interface DownloadedFile {
  id: string;
  path: string;
  title?: string;
  artist?: string;
  album?: string;
  artwork?: string;
}

export interface DownloadManagerState {
  queue: DownloadElement[];
  downloadElements: Map<string, DownloadElement>;
  downloadedFiles: DownloadedFile[];
  addToQueue: (id: string, url: string) => void;
  getDownloadElementById: (id: string) => DownloadElement | undefined;
  fetchDownloadedFiles: () => void;
}

const wantedTags = [
  'album',
  'albumArtist',
  'artwork',
  'artist',
  'name',
  'track',
  'year',
] as const;

export const useDownloadManagerStore = create<DownloadManagerState>(
  (set, get) => ({
    queue: [],
    downloadElements: new Map(),
    downloadedFiles: [],

    addToQueue: (id: string, url: string) => {
      const {queue, downloadElements} = get();

      if (downloadElements.has(id)) {
        return;
      }

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

      set({
        queue: [...queue, downloadElement],
        downloadElements: new Map(downloadElements).set(id, downloadElement),
      });

      startDownload(downloadElement);
    },

    getDownloadElementById: (id: string) => {
      const {downloadElements} = get();
      return downloadElements.get(id);
    },

    fetchDownloadedFiles: async () => {
      const dir = RNFetchBlob.fs.dirs.DocumentDir;
      try {
        const files = await RNFetchBlob.fs.ls(dir);

        const downloadedFiles = await Promise.all(
          files
            .filter(file => file.endsWith('.mp3'))
            .map(async file => {
              const filePath = `${dir}/${file}`;
              const musicFiles = await getAudioMetadata(filePath, wantedTags);
              const musicFile = musicFiles.metadata;
              return {
                id: file.replace('.mp3', ''),
                path: filePath,
                title: musicFile?.name || 'Unknown Title',
                artist: musicFile?.artist || 'Unknown Artist',
                album: musicFile?.album || 'Unknown Album',
                artwork: musicFile.artwork,
              };
            }),
        );
        set({downloadedFiles});
      } catch (error) {
        console.error('Error fetching downloaded files:', error);
      }
    },
  }),
);
const sanitizeFileName = (url: string): string => {
  const urlWithoutQuery = url.split('?')[0];
  const fileName = urlWithoutQuery.split('/').pop() || 'default';
  return `${fileName.replace(/[^\w\s]/gi, '_')}.mp3`;
};

const startDownload = (downloadElement: DownloadElement) => {
  const dir = RNFetchBlob.fs.dirs.DocumentDir;
  const fileName = sanitizeFileName(downloadElement.url);
  const filePath = `${dir}/${fileName}`;

  RNFetchBlob.config({
    path: filePath,
    fileCache: true,
    appendExt: 'mp3',
  })
    .fetch('GET', downloadElement.url)
    .progress((written, total) => {
      downloadElement.setProgress(written, total);
    })
    .then(async res => {
      const savedFilePath = res.path();
      console.log('The file is saved to:', savedFilePath);

      const musicFiles = await getAudioMetadata(savedFilePath, wantedTags);
      const musicFile = musicFiles.metadata;

      const downloadedFile: DownloadedFile = {
        id: downloadElement.id,
        path: savedFilePath,
        title: musicFile?.name || 'Unknown Title',
        artist: musicFile?.artist || 'Unknown Artist',
        album: musicFile?.album || 'Unknown Album',
        artwork: musicFile?.artwork,
      };

      const {downloadedFiles} = useDownloadManagerStore.getState();
      useDownloadManagerStore.setState({
        downloadedFiles: [...downloadedFiles, downloadedFile],
      });

      useDownloadManagerStore.getState().fetchDownloadedFiles();
    })
    .catch(error => {
      console.error(`Error downloading ${downloadElement.id}:`, error);
    });
};
