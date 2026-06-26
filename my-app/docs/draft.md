I moved from a productId-based cart structure to a product object-based structure
to simplify frontend rendering and unify guest and authenticated cart flows.

This also makes analytics tracking (GA4 ecommerce events) and cart synchronization
much more straightforward, since product data is immediately available without
additional database lookups or population.
