'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { MenuCategory } from '@/types';
import { MenuForm } from './MenuForm';

interface MenuFormSectionProps {
  isSaving: boolean;
  editingId: string | null;
  editingImage?: string;
  name: string;
  setName: (val: string) => void;
  price: number | '';
  setPrice: (val: number | '') => void;
  category: MenuCategory;
  setCategory: (val: MenuCategory) => void;
  preparationTimeMins: number | '';
  setPreparationTimeMins: (val: number | '') => void;
  portionDetails: string;
  setPortionDetails: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  selectedImageFile: File | null;
  setSelectedImageFile: (file: File | null) => void;
  onFileError: (message: string) => void;
  onSaveMenu: (e: React.FormEvent) => void;
  onResetForm: () => void;
}

// Section: form tambah / edit menu (termasuk pemilihan foto → Cloud Storage)
export const MenuFormSection: React.FC<MenuFormSectionProps> = ({
  isSaving,
  editingId,
  editingImage,
  name, setName,
  price, setPrice,
  category, setCategory,
  preparationTimeMins, setPreparationTimeMins,
  portionDetails, setPortionDetails,
  description, setDescription,
  selectedImageFile,
  setSelectedImageFile,
  onFileError,
  onSaveMenu,
  onResetForm,
}) => {
  return (
    <div className="lg:col-span-5">
      <MenuForm
        editingId={editingId}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        category={category}
        setCategory={setCategory}
        preparationTimeMins={preparationTimeMins}
        setPreparationTimeMins={setPreparationTimeMins}
        portionDetails={portionDetails}
        setPortionDetails={setPortionDetails}
        description={description}
        setDescription={setDescription}
        onSaveMenu={onSaveMenu}
        onResetForm={onResetForm}
        previewImage={editingImage}
        selectedFile={selectedImageFile}
        onFileSelected={setSelectedImageFile}
        onFileError={onFileError}
      />
      {isSaving && (
        <div className="mt-3 flex items-center gap-2 text-xs text-[#D49B42]">
          <Loader2 className="w-4 h-4 animate-spin" />
          {selectedImageFile ? 'Mengunggah foto & menyimpan ke database...' : 'Menyimpan ke database...'}
        </div>
      )}
    </div>
  );
};
