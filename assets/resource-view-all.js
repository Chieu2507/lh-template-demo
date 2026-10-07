(() => {
    const featuredCollectionSelector = '[data-featured-collection], [data-featured-blog-posts], [data-blog-posts], [data-collection-background-section]';

    const synchronizeViewAll = (featuredCollection) => {
      const viewAllButtons = Array.from(featuredCollection.querySelectorAll('[data-view-all-button]'));
      if (!viewAllButtons.length) return;

      const resource = featuredCollection.querySelector('[data-product-list]') || featuredCollection.querySelector('[data-blog-url]');
      const collectionUrl = resource?.dataset.collectionUrl?.trim() || resource?.dataset.blogUrl?.trim() || '';
      const hasMoreItems = Boolean(collectionUrl) && Number(resource?.dataset.resourceCount) > Number(resource?.dataset.resourceLimit);
      const conditionalWrappers = Array.from(featuredCollection.querySelectorAll('[data-resource-view-all]'));
      conditionalWrappers.forEach((wrapper) => {
        wrapper.hidden = !hasMoreItems && wrapper.dataset.designMode !== 'true';
      });
      const enabled = Boolean(collectionUrl) && (!conditionalWrappers.length || hasMoreItems);
      if (enabled) {
        viewAllButtons.forEach((viewAllButton) => {
          viewAllButton.setAttribute('href', collectionUrl);
          viewAllButton.removeAttribute('aria-disabled');
          viewAllButton.removeAttribute('tabindex');
        });
      } else {
        viewAllButtons.forEach((viewAllButton) => {
          viewAllButton.removeAttribute('href');
          viewAllButton.setAttribute('aria-disabled', 'true');
          viewAllButton.setAttribute('tabindex', '-1');
        });
      }
    };

    const initializeRoot = (root = document) => {
      const featuredCollections = [];
      if (root.matches?.(featuredCollectionSelector)) featuredCollections.push(root);
      root.querySelectorAll?.(featuredCollectionSelector).forEach((featuredCollection) => featuredCollections.push(featuredCollection));
      featuredCollections.forEach(synchronizeViewAll);
    };

    document.addEventListener('shopify:section:load', (event) => initializeRoot(event.target));

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => initializeRoot(), { once: true });
    } else {
      initializeRoot();
    }
  })();
