import { ConfigProvider } from '../providers/ConfigProvider';
import { AzureBlobAccessOptions, AzureBlobAccess } from '../../packages/crlife/AzureBlobAccess';

export class AzureBlobAccessFactory {
  constructor(private config: ConfigProvider) {}

  createAzureBlobAccess(): AzureBlobAccess {
    const blobAccessOptions: AzureBlobAccessOptions = {
      storageAccountName: this.config.get('AZURE_STORAGE_ACCOUNT_NAME').toString(),
      storageAccountKey: this.config.get('AZURE_STORAGE_ACCOUNT_KEY').toString(),
      storageContainer: this.config.get('AZURE_STORAGE_CONTAINER_NAME').toString()
    };

    return new AzureBlobAccess(blobAccessOptions);
  }
}
