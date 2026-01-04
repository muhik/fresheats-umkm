"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from './context/CartContext';

export default function Home() {
  const { addToCart, setIsCartOpen, cartCount } = useCart();
  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] dark:border-[#2a2a2a] bg-white/90 dark:bg-[#111811]/90 backdrop-blur-md px-6 lg:px-10 py-3">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="size-8 text-primary">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_535)">
                  <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_535"><rect fill="white" height="48" width="48"></rect></clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight">FreshEats</h2>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Home</a>
            <a className="text-sm font-semibold text-primary" href="#">Menu</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Deals</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Orders</a>
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-4 sm:gap-8">
          <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full group focus-within:ring-2 ring-primary">
              <div className="text-[#608a60] dark:text-gray-400 flex border-none bg-[#f0f5f0] dark:bg-[#1a2e1a] items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-base text-[#111811] dark:text-white border-none bg-[#f0f5f0] dark:bg-[#1a2e1a] focus:ring-0 placeholder:text-[#608a60] dark:placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2 font-normal leading-normal" placeholder="Search menu..." defaultValue="" />
            </div>
          </label>
          <Link
            href="/transactions"
            className="flex items-center gap-2 cursor-pointer justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f5f0] dark:bg-[#1a2e1a] hover:bg-gray-200 dark:hover:bg-[#243524] transition-colors text-[#111811] dark:text-white text-sm font-bold leading-normal"
            title="Lihat Riwayat Penjualan"
          >
            <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            <span className="truncate hidden sm:inline">Penjualan</span>
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 cursor-pointer justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-green-400 transition-colors text-[#111811] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            <span className="truncate hidden sm:inline">Cart ({cartCount})</span>
          </button>
          <button className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#f0f5f0] dark:bg-[#1a2e1a] text-[#111811] dark:text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            {/* HeroSection */}
            <div className="@container w-full">
              <div className="flex flex-col gap-6 py-10 @[864px]:flex-row @[864px]:items-center">
                <div className="flex flex-col gap-6 @[864px]:w-1/2 @[864px]:pr-10 order-2 @[864px]:order-1">
                  <div className="flex flex-col gap-4 text-left">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-green-700 dark:text-green-300 text-xs font-bold uppercase tracking-wider w-fit">Dish of the Day</span>
                    <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl lg:text-6xl">
                      Creamy Buko Pandan
                    </h1>
                    <p className="text-base font-normal leading-relaxed text-gray-600 dark:text-gray-300">
                      Refreshing coconut pandan dessert with nata de coco, jelly, and generous cheese topping. The perfect sweet treat for any day.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        addToCart({
                          id: 'buko-pandan-hero',
                          name: 'Creamy Buko Pandan',
                          price: 20000,
                          image: '/buko-pandan.png'
                        });
                      }}
                      className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-green-400 transition-colors text-[#111811] text-base font-bold"
                    >
                      Order Now
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-white dark:bg-[#1a2e1a] border border-[#e5e7eb] dark:border-[#2a2a2a] hover:bg-gray-50 dark:hover:bg-[#253825] transition-colors text-[#111811] dark:text-white text-base font-bold"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                <div className="w-full @[864px]:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-1 @[864px]:order-2 relative group">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 z-10"></div>
                  <div className="w-full h-full bg-center bg-no-repeat bg-cover transform group-hover:scale-105 transition-transform duration-700" title="Refreshing Buko Pandan with cheese topping" style={{ backgroundImage: 'url("/buko-pandan.png")' }}></div>
                  <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-yellow-500 text-[18px] fill-1">star</span>
                      <span className="text-xs font-bold">4.9 (2k+)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Category Chips */}
            <div className="sticky top-[72px] z-40 bg-background-light dark:bg-background-dark py-4 -mx-4 px-4 md:px-0 md:mx-0 overflow-hidden">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#111811] text-white pl-5 pr-5 shadow-lg shadow-green-900/10 transition-transform active:scale-95">
                  <span className="material-symbols-outlined text-[20px]">restaurant</span>
                  <p className="text-sm font-bold leading-normal">All</p>
                </button>
                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1a2e1a] border border-[#e5e7eb] dark:border-[#2a2a2a] pl-5 pr-5 hover:border-primary hover:text-primary transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[20px]">icecream</span>
                  <p className="text-sm font-medium leading-normal">Desserts</p>
                </button>
                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1a2e1a] border border-[#e5e7eb] dark:border-[#2a2a2a] pl-5 pr-5 hover:border-primary hover:text-primary transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[20px]">lunch_dining</span>
                  <p className="text-sm font-medium leading-normal">Savory</p>
                </button>
                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1a2e1a] border border-[#e5e7eb] dark:border-[#2a2a2a] pl-5 pr-5 hover:border-primary hover:text-primary transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[20px]">local_bar</span>
                  <p className="text-sm font-medium leading-normal">Drinks</p>
                </button>
              </div>
            </div>
            {/* Bundle Offers Section */}
            <div id="menu-section" className="py-8">
              <div className="flex items-center justify-between px-2 pb-4 pt-2">
                <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">local_fire_department</span>
                  Hot Deals
                </h2>
                <a className="text-sm font-semibold text-primary hover:underline" href="#">View All</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                {/* Offer Card 1 */}
                <div className="relative overflow-hidden rounded-xl bg-[#111811] text-white p-6 md:p-8 flex flex-col justify-center min-h-[240px]">
                  <div className="absolute right-[-20px] top-[-20px] w-[200px] h-[200px] bg-primary/20 rounded-full blur-[60px]"></div>
                  <div className="absolute right-0 bottom-0 w-1/2 h-full bg-cover bg-center opacity-40 mix-blend-overlay" title="Paket komplit pempek dan es oyen" style={{ backgroundImage: "url('/es-oyen.png')" }}></div>
                  <div className="relative z-10 max-w-[60%]">
                    <span className="inline-block px-2 py-1 bg-primary text-[#111811] text-xs font-bold rounded mb-3">KOMBO HEMAT</span>
                    <h3 className="text-2xl md:text-3xl font-black mb-2">Paket Segar Mantap</h3>
                    <p className="text-gray-300 text-sm mb-6">1 Porsi Pempek Lengkap + Es Oyen Bandung</p>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-primary">Rp 35.000</span>
                      <span className="text-gray-400 text-lg line-through">Rp 40.000</span>
                    </div>
                    <button className="mt-4 w-fit bg-white text-[#111811] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">
                      Pesan Sekarang
                    </button>
                  </div>
                </div>
                {/* Offer Card 2 */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-600 to-emerald-800 text-white p-6 md:p-8 flex flex-col justify-center min-h-[240px]">
                  <div className="absolute right-0 bottom-[-20px] w-1/2 h-[120%] bg-cover bg-no-repeat bg-center" title="Buko pandan creamy segar" style={{ backgroundImage: "url('/buko-pandan.png')", maskImage: "linear-gradient(to left, black 60%, transparent)", WebkitMaskImage: "linear-gradient(to left, black 60%, transparent)" }}></div>
                  <div className="relative z-10 max-w-[65%]">
                    <span className="inline-block px-2 py-1 bg-white text-green-700 text-xs font-bold rounded mb-3">BEST SELLER</span>
                    <h3 className="text-2xl md:text-3xl font-black mb-2">Pandan Party 2x</h3>
                    <p className="text-white/90 text-sm mb-6">2 Cup Creamy Buko Pandan (Extra Cheese)</p>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-white">Rp 35.000</span>
                      <span className="text-white/70 text-lg line-through">Rp 40.000</span>
                    </div>
                    <button className="mt-4 w-fit bg-[#111811] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-black/80 transition-colors">
                      Pesan Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* SectionHeader */}
            <div className="flex items-center justify-between px-2 pt-8 pb-4">
              <h2 className="text-[#111811] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Popular Menu Items</h2>
              <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#1a2e1a] hover:bg-primary hover:text-black transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#1a2e1a] hover:bg-primary hover:text-black transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
            {/* Menu Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
              {/* Item 1 - Es Oyen */}
              <div className="group flex flex-col gap-3 pb-3 bg-white dark:bg-[#1a2e1a] p-4 rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-gray-800 shadow-sm hover:shadow-md transition-all">
                <div className="w-full relative bg-center bg-no-repeat aspect-square bg-cover rounded-lg overflow-hidden" title="Es Oyen Bandung segar" style={{ backgroundImage: 'url("/es-oyen.png")' }}>
                  <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-black/60 hover:bg-white text-gray-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </button>
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-pink-100 text-pink-700 text-[10px] font-bold uppercase">Popular</div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[#111811] dark:text-white text-lg font-bold leading-tight">Es Oyen Bandung</p>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="material-symbols-outlined text-[14px] fill-1">star</span>
                      <span className="text-xs font-bold text-[#111811] dark:text-white">4.8</span>
                    </div>
                  </div>
                  <p className="text-[#608a60] dark:text-gray-400 text-sm font-normal leading-normal line-clamp-2 mb-3">Campuran alpukat, kelapa muda, nangka, dan mutiara dengan sirup spesial.</p>
                  <div className="mt-auto flex items-center justify-between">
                    <p className="text-[#111811] dark:text-white text-lg font-bold">Rp 15.000</p>
                    <button
                      onClick={() => addToCart({
                        id: 'es-oyen',
                        name: 'Es Oyen Bandung',
                        price: 15000,
                        image: '/es-oyen.png'
                      })}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-[#111811] hover:bg-green-400 transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[20px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Item 2 - Pempek */}
              <div className="group flex flex-col gap-3 pb-3 bg-white dark:bg-[#1a2e1a] p-4 rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-gray-800 shadow-sm hover:shadow-md transition-all">
                <div className="w-full relative bg-center bg-no-repeat aspect-square bg-cover rounded-lg overflow-hidden" title="Pempek Palembang Asli" style={{ backgroundImage: 'url("/empek-empek.png")' }}>
                  <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-black/60 hover:bg-white text-gray-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </button>
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-orange-100 text-orange-700 text-[10px] font-bold uppercase">Savory</div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[#111811] dark:text-white text-lg font-bold leading-tight">Pempek Palembang</p>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="material-symbols-outlined text-[14px] fill-1">star</span>
                      <span className="text-xs font-bold text-[#111811] dark:text-white">4.9</span>
                    </div>
                  </div>
                  <p className="text-[#608a60] dark:text-gray-400 text-sm font-normal leading-normal line-clamp-2 mb-3">Pempek ikan tenggiri asli disajikan dengan kuah cuko pedas manis.</p>
                  <div className="mt-auto flex items-center justify-between">
                    <p className="text-[#111811] dark:text-white text-lg font-bold">Rp 25.000</p>
                    <button
                      onClick={() => addToCart({
                        id: 'pempek',
                        name: 'Pempek Palembang',
                        price: 25000,
                        image: '/empek-empek.png'
                      })}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-[#111811] hover:bg-green-400 transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[20px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Item 3 - Buko Pandan */}
              <div className="group flex flex-col gap-3 pb-3 bg-white dark:bg-[#1a2e1a] p-4 rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-gray-800 shadow-sm hover:shadow-md transition-all">
                <div className="w-full relative bg-center bg-no-repeat aspect-square bg-cover rounded-lg overflow-hidden" title="Creamy Buko Pandan" style={{ backgroundImage: 'url("/buko-pandan.png")' }}>
                  <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-black/60 hover:bg-white text-gray-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </button>
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-bold uppercase">Sweet</div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[#111811] dark:text-white text-lg font-bold leading-tight">Buko Pandan Creamy</p>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="material-symbols-outlined text-[14px] fill-1">star</span>
                      <span className="text-xs font-bold text-[#111811] dark:text-white">4.9</span>
                    </div>
                  </div>
                  <p className="text-[#608a60] dark:text-gray-400 text-sm font-normal leading-normal line-clamp-2 mb-3">Dessert kelapa muda dan pandan dengan jelly dan topping keju melimpah.</p>
                  <div className="mt-auto flex items-center justify-between">
                    <p className="text-[#111811] dark:text-white text-lg font-bold">Rp 20.000</p>
                    <button
                      onClick={() => addToCart({
                        id: 'buko-pandan',
                        name: 'Buko Pandan Creamy',
                        price: 20000,
                        image: '/buko-pandan.png'
                      })}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-[#111811] hover:bg-green-400 transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[20px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center my-8">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#e5e7eb] dark:border-[#2a2a2a] bg-white dark:bg-[#1a2e1a] hover:bg-gray-50 dark:hover:bg-[#253825] text-[#111811] dark:text-white font-semibold transition-colors">
                Load More Items
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
            </div>
            {/* Testimonials Section */}
            <div className="my-10 bg-white dark:bg-[#1a2e1a] rounded-2xl p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3">Kata Pelanggan Kami</h2>
                <p className="text-gray-500 dark:text-gray-400">Ulasan asli dari pecinta kuliner</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Testimonial 1 */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                  </div>
                  <p className="text-[#111811] dark:text-white text-lg leading-relaxed">"Es Oyen-nya seger banget! Cocok dimakan pas siang hari yang panas. Pasti pesan lagi deh!"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">DS</div>
                    <div>
                      <p className="font-bold text-sm">Dewi Sartika</p>
                      <p className="text-xs text-gray-500">Pelanggan Terverifikasi</p>
                    </div>
                  </div>
                </div>
                {/* Testimonial 2 */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                  </div>
                  <p className="text-[#111811] dark:text-white text-lg leading-relaxed">"Pempek Palembang-nya asli enak! Cuko-nya pas banget, tidak terlalu pedas tapi nampol. Recommended!"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">BP</div>
                    <div>
                      <p className="font-bold text-sm">Budi Prasetyo</p>
                      <p className="text-xs text-gray-500">Pelanggan Terverifikasi</p>
                    </div>
                  </div>
                </div>
                {/* Testimonial 3 */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined">star_half</span>
                  </div>
                  <p className="text-[#111811] dark:text-white text-lg leading-relaxed">"Buko Pandan-nya creamy dan segar. Keju-nya melimpah, porsi pas buat sekeluarga. Harga terjangkau banget!"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">RA</div>
                    <div>
                      <p className="font-bold text-sm">Rina Anggraini</p>
                      <p className="text-xs text-gray-500">Pelanggan Terverifikasi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer */}
            <footer className="mt-10 border-t border-[#e5e7eb] dark:border-[#2a2a2a] pt-10 pb-6 px-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4 text-[#111811] dark:text-white">
                  <div className="size-6 text-primary">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_6_535_footer)">
                        <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_6_535_footer"><rect fill="white" height="48" width="48"></rect></clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold">FreshEats</h2>
                </div>
                <div className="flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                  <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                  <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                  <a className="hover:text-primary transition-colors" href="#">Help Center</a>
                </div>
                <div className="flex gap-4">
                  <a className="text-gray-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
                  <a className="text-gray-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">smartphone</span></a>
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mt-8">© 2024 FreshEats. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-[#111811] shadow-xl flex items-center justify-center hover:bg-green-400 hover:scale-110 transition-all duration-300">
        <span className="material-symbols-outlined text-2xl">chat</span>
      </button>
    </div>
  );
}
