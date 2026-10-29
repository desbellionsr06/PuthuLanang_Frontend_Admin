'use client';

// Halaman Kelola Menu — Route: /admin/kelola
// ─────────────────────────────────────────────────────────────────────
// page.tsx hanya merakit section. Seluruh section ada di ./components,
// dan logika (fetch, simpan, upload foto ke Cloud Storage) di ./useKelolaMenu.
// Proteksi login ditangani oleh src/proxy.ts + app/admin/layout.tsx.
// ─────────────────────────────────────────────────────────────────────

import React from 'react';
import { useStore } from '@/store/useStore';
import { useKelolaMenu } from './useKelolaMenu';
import { KelolaHeaderSection } from './components/KelolaHeaderSection';
import { MenuFormSection } from './components/MenuFormSection';
import { MenuListSection } from './components/MenuListSection';

export default function KelolaPage() {
  const { addToast } = useStore();
  const {
    menuList,
    isLoading,
    isRefreshing,
    isSaving,
    error,
    loadMenu,
    editingId,
    editingImage,
    name, setName,
    price, setPrice,
    category, setCategory,
    preparationTimeMins, setPreparationTimeMins,
    portionDetails, setPortionDetails,
    description, setDescription,
    selectedImageFile, setSelectedImageFile,
    resetForm,
    handleSaveMenu,
    handleEditClick,
    handleDeleteClick,
  } = useKelolaMenu();

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">

      {/* Header + banner error */}
      <KelolaHeaderSection
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        itemCount={menuList.length}
        error={error}
        onRefresh={() => loadMenu(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

        {/* Kiri: Form Tambah / Edit Menu */}
        <MenuFormSection
          isSaving={isSaving}
          editingId={editingId}
          editingImage={editingImage}
          name={name} setName={setName}
          price={price} setPrice={setPrice}
          category={category} setCategory={setCategory}
          preparationTimeMins={preparationTimeMins} setPreparationTimeMins={setPreparationTimeMins}
          portionDetails={portionDetails} setPortionDetails={setPortionDetails}
          description={description} setDescription={setDescription}
          selectedImageFile={selectedImageFile}
          setSelectedImageFile={setSelectedImageFile}
          onFileError={(msg) => addToast(msg, 'warning')}
          onSaveMenu={handleSaveMenu}
          onResetForm={resetForm}
        />

        {/* Kanan: Daftar Menu Aktif */}
        <MenuListSection
          menuList={menuList}
          isLoading={isLoading}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />

      </div>
    </div>
  );
}
