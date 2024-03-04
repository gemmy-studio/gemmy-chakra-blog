import * as zlib from 'zlib';

const decompressContent = (compressedData: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(JSON.parse(compressedData).data);

    zlib.gunzip(buffer, (error, result) => {
      if (error) {
        reject(error);
      } else {
        try {
          const decompressedData = result.toString();
          resolve(decompressedData);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
};

export default decompressContent;
