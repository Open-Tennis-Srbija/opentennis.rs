import { ref } from 'vue';
import axios from 'axios';
import bus from 'vue3-eventbus';

/**
 * A list that loads one page at a time from a paginated endpoint.
 * urlFor(page) builds the request URL for a page, including the current sort.
 */
export function useLazyList(urlFor) {
    const items = ref([]);
    const isLoading = ref(true);
    const isLoadingMore = ref(false);
    const hasMoreData = ref(true);
    const currentPage = ref(1);

    // Bumped on every reload so responses for an older sort are dropped
    let requestId = 0;

    const reload = async () => {
        const request = ++requestId;
        isLoading.value = true;
        isLoadingMore.value = false;

        // A new sort starts from its first row, otherwise the old scroll
        // position would sit near the end of the shorter list and load page 2 at once
        bus.emit('resetScroll');

        try {
            const response = await axios.get(urlFor(1));
            if (request !== requestId) return;

            items.value = response.data.data;
            currentPage.value = 1;
            hasMoreData.value = currentPage.value < response.data.last_page;
        } catch (error) {
            console.error('Error loading list:', error);
        } finally {
            if (request === requestId) {
                isLoading.value = false;
                bus.emit('loading', false);
            }
        }
    };

    const loadMore = async () => {
        if (isLoading.value || isLoadingMore.value || !hasMoreData.value) return;

        const request = requestId;
        isLoadingMore.value = true;

        try {
            const response = await axios.get(urlFor(currentPage.value + 1));
            if (request !== requestId) return;

            items.value = [...items.value, ...response.data.data];
            currentPage.value++;
            hasMoreData.value = currentPage.value < response.data.last_page;
        } catch (error) {
            console.error('Error loading more:', error);
        } finally {
            if (request === requestId) isLoadingMore.value = false;
        }
    };

    return { items, isLoading, isLoadingMore, reload, loadMore };
}
