Backend : Typescript, Express JS, Prisma  
Frontend: React JS  
Unit Testing: Jest, Supertest  
E2E Testing: Jest, Playwright  

Untuk memulai silahkan clone repository terlebih dahulu.
Setelah selesai diclone jalankan `pnpm install` pada folder simple-rest-api(folder utama), frontend dan e2e karena masing-masing memiliki package yang terpisah.  
Setelah selesai diinstall jalankan command `pnpm migrate` untuk generate prisma/client.  
Jalankan aplikasi secara lokal dengan command `pnpm start` untuk backend. Pindah ke folder frontend kemudian ketik `pnpm dev` untuk menjalankan frontendnya.  
Aplikasi sudah bisa dicoba.  

Untuk unit testing silahkan run `pnpm test`.  
Untuk e2e testing, pindah terlebih dahulu ke folder e2e testing dan jalankan command `pnpm test`.  
Pada e2e testing saya mengcomment codingan untuk register. Untuk pertama kali silahkan uncomment codingannya agar user yang kita masukkan di codingan login terdaftar.  

Alasan saya menggunakan pattern arsitektur MVC adalah karena pattern ini sudah umum dan digunakan secara luas dalam membuat REST-API. Penggunaannya yang paling penting   
adalah untuk memisahkan tampilan(view) dari model dan controller sehingga memungkinkan perubahan di setiap bagian tanpa mempengaruhi bagian yang lain. Selain itu jika  
terdapat error/bug maka developer bisa mudah untuk menemukan bugnya akibat dari pemisahan yang dilakukan pattern MVC ini.  
