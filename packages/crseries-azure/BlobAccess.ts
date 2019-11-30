import { StorageSharedKeyCredential, BlobServiceClient } from "@azure/storage-blob";

export interface BlobAccessOptions {
    storageAccountName: string,
    storageAccountKey: string,
}
export class BlobAccess
{
    constructor(
        private options: BlobAccessOptions
    ) {}

    async readBlob(blobPath: string) : Promise<string>
    {
        const sharedKeyCredential = new StorageSharedKeyCredential(this.options.storageAccountName, this.options.storageAccountKey);
        const blobServiceClient = new BlobServiceClient(
            `https://${this.options.storageAccountName}.blob.core.windows.net`,
            sharedKeyCredential
        );

        const containerClient = blobServiceClient.getContainerClient('crseries');
        const blobClient = containerClient.getBlobClient(blobPath);

        const downloadBlockBlobResponse = await blobClient.download();
        const downloaded = await streamToString(downloadBlockBlobResponse.readableStreamBody);

        return downloaded.toString();
    }
}

async function streamToString(readableStream : any) {
    return new Promise((resolve, reject) => {
      const chunks : any[] = [];
      readableStream.on("data", (data : any) => {
        chunks.push(data.toString());
      });
      readableStream.on("end", () => {
        resolve(chunks.join(""));
      });
      readableStream.on("error", reject);
    });
}