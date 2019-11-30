import { BlobAccess } from '../../../packages/crseries-azure/BlobAccess';

interface ActionOptions {
    blobPath: string,
    accountName: string,
    accountKey: string
}

function action(options: ActionOptions) : void
{
    const blobAccess = new BlobAccess({
        storageAccountName: options.accountName,
        storageAccountKey: options.accountKey
    });

    blobAccess.readBlob(options.blobPath).then(data => console.log(data))
}

export { action, ActionOptions }