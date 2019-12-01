import { StorageSharedKeyCredential, BlobServiceClient } from "@azure/storage-blob";

export interface AzureBlobAccessOptions {
    storageAccountName: string,
    storageAccountKey: string,
    storageContainer: string
}
export class AzureBlobAccess
{
    constructor(
        private options: AzureBlobAccessOptions
    ) {}

    async readBlob(blobPath: string) : Promise<string>
    {
        const sharedKeyCredential = new StorageSharedKeyCredential(this.options.storageAccountName, this.options.storageAccountKey);
        const blobServiceClient = new BlobServiceClient(
            `https://${this.options.storageAccountName}.blob.core.windows.net`,
            sharedKeyCredential
        );

        const containerClient = blobServiceClient.getContainerClient(this.options.storageContainer);
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