import { SaaSSpyApiClient } from '../utils/apiClient';
import { ExtensionStorage } from '../utils/storage';

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    // Initial sync with Edge API
    const liveCoupons = await SaaSSpyApiClient.fetchLiveCoupons();
    if (liveCoupons && liveCoupons.length > 0) {
      await ExtensionStorage.setCoupons(liveCoupons);
    }
  }
});
