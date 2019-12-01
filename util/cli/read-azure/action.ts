import { AzureBlobAccess } from '../../../packages/crlife/AzureBlobAccess';

interface ActionOptions {
    blobPath: string,
    accountName: string,
    accountKey: string
}

function action(options: ActionOptions) : void
{
    const blobAccess = new AzureBlobAccess({
        storageAccountName: options.accountName,
        storageAccountKey: options.accountKey,
        storageContainer: 'crseries'
    });

    blobAccess.readBlob(options.blobPath).then(data => console.log(data))
}

export { action, ActionOptions }