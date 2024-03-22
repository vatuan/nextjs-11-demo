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

## SSR, CSR, SSG and ISR

### Pre-rendering

![Pre-rendering](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1711091872/NextJs%20%5BPage%20routers%5D/pre-rendering_codmnn.png)

1. Write code ben phia react
2. Build o mode `production`. Dung ReactDomServer de build ra nhung file `HTML`
3. Khi user request len server (hay noi cach khac la truy cap vao duong dan vd`/about`) thi server se tra ve file HTML (vd: `about.html`), file HTML nay da duoc render san co day du layout, text,... Tuy nhien no chi la nhung content tĩnh chua co event
4. Sau khi page đã load được nội dung của file HTML lên rồi thì nó sé load thêm file `JS` và nó thực hiện quá trình gọi là `Hydration` (Dùng hàm ReactDOM.hydrate() attach event listener lên markup đã được render phía server)

![Pre-rendering](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1711093729/NextJs%20%5BPage%20routers%5D/pre-rendering-012_airhff.png)
Có 2 loại pre-rendering là

- SSG [Static Site Generation] (Khá xịn, được dùng default bới NextJs)
- SSR [Server Site Rendering]

**Pre rendering**: có nghĩa là sẽ render sẵn file `HTML` ở phía _server_, khi user truy cập vào đường dẫn thì sẽ có file HTML sẵn để show lên (lúc này vẫn là _content tĩnh_), sau đó sẽ load thêm `Javascript` và khi đó sẽ thực hiện quá trình **Hydration**

> View page source

![Pre-rendering](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1711095419/NextJs%20%5BPage%20routers%5D/page-source-pre-render_xhjfix.png)

**No Pre-rendering** có nghĩa là trong lần render đầu tiên, file `HTML` tải về là file rỗng (chỉ có 1 div là root thôi) ,sau đó sẽ load `Javascript` lên để render DOM

> View page source

![No pre-rendering](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1711095426/NextJs%20%5BPage%20routers%5D/np-prerendering_cbq2gt.png)

### SSG (Static Site Generation)

![SSG](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1711096154/NextJs%20%5BPage%20routers%5D/SSG_ymuozu.png)

Tại thời điểm build project các file `HTML` tĩnh sẽ được tạo ra, khi mỗi user request lên sẽ trả về file HTML đã build sẵn, các file HTML đã được build có thể được cache trên CDN -> tái sử dụng trên các request -> tối ưu preformance
_Note_: Đây là ở bước **build-time**, khi chạy lệnh `build` (build-time)

### SSR (Server Side Rendering)

![SSR](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1711096983/NextJs%20%5BPage%20routers%5D/SSR_qflypd.png)

Khi user gửi 1 request --> server NextJs sẽ đi xử lý dữ liệu --> Tạo ra file `HTML` --> trả về cho user
Cứ mỗi lần gửi user gửi request lên thì server sẽ phải xử lý dữ liệu và gửi về cho user. Nếu có nhiều request như vậy thì server làm việc khá nhọc -> tốn resource của server.

Với mỗi lần request lên server sẽ tùy thuộc vào server của bạn tính toán nhanh hay chậm để tạo ra file `HTML` --> user sẽ phải đợi để server tạo ra file `HTML`. Có 1 chỉ số là `Time to first byte` có nghĩa là server xử lí càng lâu thì chỉ số này càng lớn

### CSR (Client Side Rendering)

![CSR](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1711098184/NextJs%20%5BPage%20routers%5D/CRS_bfeesd.png)

Trong NextJs khi nhắc đến _Client Site Rendering (CSR)_ thì có thể kết hợp với _Static Site Generation (SSG)_ -> tạo ra các file markup sẵn.Khi show lên được cái markup sẵn rồi thì đi fetch dữ liệu để show dữ liệu động đó lên
Làm trong TH: dữ liệu không cần render sẵn bên phía server, không cần SEO, cho các private website

### ISR (Incremental Static Regeneration)

Refer: https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs/

### Pre-rendering form is per-page basis

Mỗi trang có thể config theo 1 kiểu pre-rendering khác nhau tùy thuộc vào sự tham gia của các hàm như hình bên dưới

![basis](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1711099640/NextJs%20%5BPage%20routers%5D/awesine_irh49r.png)

#### Link hay nen tham khao

- Khi nao nen dung CSR, SSG : https://github.com/vercel/next.js/discussions/10437#discussioncomment-90459
