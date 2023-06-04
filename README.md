This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Install NextJs version 11

`npx create-next-app@11 my-next-app`

> setup typescript

1. `touch tsconfig.json`
2. `npm install --save-dev typescript @types/react @types/node` or `yarn add --dev typescript @types/react @types/node`
3. rename file use `.js` extension to `.tsx` or `.ts` for suitable

## File system routing

follow link [File system routing in NextJs 11](https://drive.google.com/drive/folders/14S5DNUTTASaNwHZN-rfky78WU2I4sBZz)

### Navigate between pages

- Khi link sang 1 page khác, NextJs chỉ đơn giản tải 1 file js về , sau đó thực thi file js đó, không phải là full page reload
- Với NextJs chỉ là tải thêm file về, nếu file đã được tải rồi nó sẽ không tải lại nữa --> tăng trải nghiệm mượt mà
- Khi chuyển sang sẽ là `client side routing` không là `full page reload`

```php
import Link from 'next/link'

// in Home page
<Link href="/about">Go to about page</Link>

```

#### prefetch

- ví dụ : tại trang `Home` có _liên kết_ đến trang `About`, để đảm việc user click vào _liên kết_ để sang trang `About` ngay lập tức thì sẽ làm 1 hành động gọi là `prefetch`
- `prefetch` là fetch những thông tin của trang `About` (trang đích), fetch về chỉ để đó thôi và khi click thì sẽ có sẵn file `js` rồi nó chỉ việc thực thi thôi
- prefetch chỉ tải file `js` về, chứ **chưa** thực thi, đến khi click vào `link` thì mới thực thi để chuyển trang

- prefetch chỉ chạy trên `production mode`, tức là khi bạn chạy lệnh `build`
- để kiểm tra, vào tab `element` tìm trong cuối thẻ `head`, sẽ thấy xuất hiện:

```php
<link as="script" rel="prefetch" href="/_next/static/chunks/pages/about-eae76c60c89ff0f5.js">
```

- `Link` mặc định có prefetch
- chỉ prefetch nếu **nằm trong** `viewport` , ví dụ tại trang `Home`, liên kết sang trang `About` nằm ở ngoài `viewport` thì sẽ không được prefetch, nó sẽ chỉ prefetch khi ta scroll xuống

```php
      <div>
        <h1>Home page</h1>

        // Lúc này đường dẫn sang trang About đã nằm ngoài viewport nên không được prefetch
        // sẽ chỉ prefetch thì user scroll xuống đến khi đường dẫn xuất hiện trên viewport
        <div style={{ marginTop: '2000px' }}>
          <Link href="/about">Go to about page</Link>
        </div>
      </div>
```

- trong trường hợp `slow network` thì sẽ không prefetch
- nếu muốn chặn prefetch thì có thể thêm `prefetch={false}` vào `Link`

```php
    <div>
        <h1>Home page</h1>
          <Link href="/about" prefetch={false}>
            Go to about page
          </Link>
    </div>
```
