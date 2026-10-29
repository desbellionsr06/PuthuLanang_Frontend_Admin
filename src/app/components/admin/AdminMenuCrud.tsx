'use client';

// AdminMenuCrud.tsx — wrapper CRUD menu untuk halaman admin.
// Import diperbaiki agar mengarah ke lokasi aktual setelah refactoring.
import { useStore } from '@/store/useStore';
import { MenuItemModel, MenuCategory } from '@/types';
import { fetchAdminMenu, createAdminMenu, updateAdminMenu, deleteAdminMenu } from '@/lib/adminApi';
import { MenuForm } from './menu/MenuForm';
import { MenuItemCard } from './menu/MenuItemCard';

// Re-export semua yang dibutuhkan consumer lama
export { useStore, MenuForm, MenuItemCard };
export type { MenuItemModel, MenuCategory };
export { fetchAdminMenu, createAdminMenu, updateAdminMenu, deleteAdminMenu };
