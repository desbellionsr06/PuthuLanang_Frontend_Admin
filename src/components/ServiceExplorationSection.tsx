'use client';

import React from 'react';
import { useStore, ViewTab } from '@/store/useStore';
import { Utensils, History, MapPin, Gift, ArrowUpRight } from 'lucide-react';

export const ServiceExplorationSection: React.FC = () => {
  const { setActiveView } = useStore();

  const services: {
    title: string;
    subtitle: string;
    desc: string;
    icon: React.ReactNode;
    view: ViewTab;
    badge: string;
    badgeColor: string;
  }[] = [
    {
      title: 'Menu Jajanan Pusaka',
      subtitle: 'Katalog Porsi & Varian',
      desc: 'Pilihan Puthu Bambu, Klepon Lumer, Cenil Pelangi, dan Lupis Ketan siap pesan.',
      icon: <Utensils className="w-6 h-6 text-[#D49B42]" />,
      view: 'menu',
      badge: 'Ready Steamed',
      badgeColor: 'bg-[#2E7D32]/20 border-[#2E7D32]/40 text-[#2E7D32]'
    },
    {
      title: 'Heritage Story 1935',
      subtitle: 'Sejarah 3 Generasi',
      desc: 'Kisah Mbah Soponyono merintis gerobak bambu hingga era modernisasi Puthu Lanang.',
      icon: <History className="w-6 h-6 text-[#D49B42]" />,
      view: 'heritage',
      badge: 'Est. 1935',
      badgeColor: 'bg-[#D49B42]/20 border-[#D49B42]/40 text-[#D49B42]'
    },
    {
      title: 'Lokasi & Jam Outlet',
      subtitle: 'Celaket Malang',
      desc: 'Peta lokasi interaktif, status antrean bara dapur, dan rute navigasi cepat.',
      icon: <MapPin className="w-6 h-6 text-[#D49B42]" />,
      view: 'location',
      badge: '17:30 - 21:30 WIB',
      badgeColor: 'bg-[#2E7D32]/20 border-[#2E7D32]/40 text-[#2E7D32]'
    },
    {
      title: 'Pesanan Khusus Tampah',
      subtitle: 'Hajatan & Acara Kantor',
      desc: 'Configurator tampah besar & besek hampers eksklusif dengan pilihan rasio varian.',
      icon: <Gift className="w-6 h-6 text-[#D49B42]" />,
      view: 'custom',
      badge: 'Special Catering',
      badgeColor: 'bg-[#D49B42]/20 border-[#D49B42]/40 text-[#D49B42]'
    },
  ];

  return (
    <section className="py-16 bg-[#17110C] border-b border-[#3F2D23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D49B42]">
              Layanan Utama Platform
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8F4EC] mt-1">
              Eksplorasi Layanan & Ragam Tradisi
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#C5B8A8] max-w-md">
            Temukan sajian tradisional berkualitas tinggi yang diolah sesuai dengan standar otentik legendaris Celaket Malang.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveView(item.view)}
              className="group bg-[#241913] border border-[#3F2D23] hover:border-[#D49B42] rounded-3xl p-6 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#17110C] border border-[#3F2D23] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs text-[#D49B42] font-semibold">{item.subtitle}</p>
                <h3 className="text-lg font-bold text-[#F8F4EC] mt-1 group-hover:text-[#D49B42] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#C5B8A8] mt-2 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#3F2D23]/60 flex items-center justify-between text-xs font-bold text-[#F8F4EC] group-hover:text-[#D49B42]">
                <span>Jelajahi Sekarang</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
