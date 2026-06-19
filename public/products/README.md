# Local product images (you control these)

Drop a real photo here to override the auto-fetched image for any product.

## How it works

- File name must match the product **slug** + `.jpg`, e.g. `mangga-carabao-mango.jpg`.
- The app uses the local file the moment it exists; if it's missing, it falls
  back automatically to the remote image (no broken images either way).
- Recommended: square-ish JPG, ~600×600px, optimized (< 150 KB).

## Slugs for the items currently set up for local override

These are the harder-to-match items (the app uses LoremFlickr for them by
default), so they benefit most from a controlled photo:

| Product                   | File to add                         |
| ------------------------- | ----------------------------------- |
| Pechay (Pak Choi)         | `pechay-pak-choi.jpg`               |
| Ampalaya (Bitter Gourd)   | `ampalaya-bitter-gourd.jpg`         |
| Okra                      | `okra.jpg`                          |
| Mangga Carabao (Mango)    | `mangga-carabao-mango.jpg`          |
| Papaya                    | `papaya.jpg`                        |
| Pinya (Pineapple)         | `pinya-pineapple.jpg`               |
| Bayabas (Guava)           | `bayabas-guava.jpg`                 |
| Pakwan (Watermelon)       | `pakwan-watermelon.jpg`             |
| Pork Spareribs            | `pork-spareribs.jpg`                |
| Bangus (Milkfish)         | `bangus-milkfish.jpg`               |
| Tilapia                   | `tilapia.jpg`                       |
| Galunggong                | `galunggong.jpg`                    |
| Malagkit (Glutinous Rice) | `malagkit-glutinous-rice-1kg.jpg`   |

## Enabling local override for ANY product

In `app/utils/mock.ts`, a product gets a local override when its `image_local`
is set. By default that's only the `flickr:` items. To control a `meal:` item
too, change its `image_local` to `/products/<its-slug>.jpg` and add the file.
The slug is shown on each product's detail URL.
