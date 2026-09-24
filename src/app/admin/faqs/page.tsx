"use client";

import React, { useState } from "react";
import { PlusCircle, HelpCircle, Trash2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import { FAQItem } from "@/types";

interface FAQAdminItem extends FAQItem {
  id: string;
}

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQAdminItem[]>([]);
  const [selectedToDelete, setSelectedToDelete] = useState<FAQAdminItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCategory, setNewCategory] = useState<FAQItem["category"]>("General");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    setFaqs((prev) => [
      ...prev,
      {
        id: `faq-${Date.now()}`,
        question: newQuestion.trim(),
        answer: newAnswer.trim(),
        category: newCategory,
      },
    ]);
    setNewQuestion("");
    setNewAnswer("");
    setIsAdding(false);
  };

  const columns: Column<FAQAdminItem>[] = [
    {
      header: "Question",
      accessor: (item) => <div className="font-bold text-on-surface">{item.question}</div>,
    },
    {
      header: "Category",
      accessor: (item) => (
        <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-semibold text-[11px]">
          {item.category}
        </span>
      ),
    },
    {
      header: "Answer Preview",
      accessor: (item) => (
        <p className="line-clamp-2 text-xs text-on-surface-variant max-w-md">
          {item.answer}
        </p>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "Content" }, { label: "FAQs" }]} />

      <AdminPageHeader
        title="Frequently Asked Questions"
        subtitle="Manage knowledge base and customer support Q&amp;A pairs across services and AMCs."
      >
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all font-manrope shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </AdminPageHeader>

      {isAdding && (
        <form
          onSubmit={handleAdd}
          className="surface-card p-6 rounded-2xl border border-primary/40 bg-primary/5 space-y-4"
        >
          <h4 className="text-sm font-bold text-primary font-manrope">
            Add New Knowledgebase Question
          </h4>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <input
                type="text"
                autoFocus
                placeholder="Question (e.g. What SLA response times do you offer for AMC?)"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="sm:col-span-8 bg-white border border-outline-variant/40 rounded-xl px-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as FAQItem["category"])}
                className="sm:col-span-4 bg-white border border-outline-variant/40 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-medium"
              >
                <option value="General">General</option>
                <option value="Services">Services</option>
                <option value="Support & AMC">Support &amp; AMC</option>
                <option value="Security">Security</option>
              </select>
            </div>
            <textarea
              rows={3}
              placeholder="Detailed answer..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="w-full bg-white border border-outline-variant/40 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-outline-variant/40 text-xs font-bold rounded-xl hover:bg-surface-container font-manrope cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 font-manrope cursor-pointer"
              >
                Save Question
              </button>
            </div>
          </div>
        </form>
      )}

      <AdminDataTable<FAQAdminItem>
        columns={columns}
        data={faqs}
        keyExtractor={(f) => f.id}
        searchPlaceholder="Search questions and answers..."
        searchKeys={["question", "answer", "category"]}
        emptyTitle="No FAQs in Firestore yet"
        emptyDescription="Add frequently asked questions to answer prospective client queries."
        emptyActionLabel="Add First FAQ"
        onAction={() => setIsAdding(true)}
        actions={(item) => (
          <button
            onClick={() => setSelectedToDelete(item)}
            className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-red-50 text-on-surface-variant hover:text-error transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      />

      <AdminConfirmDialog
        isOpen={Boolean(selectedToDelete)}
        title="Delete FAQ"
        message={`Are you sure you want to delete question "${selectedToDelete?.question}"?`}
        onConfirm={() => {
          setFaqs((prev) => prev.filter((f) => f.id !== selectedToDelete?.id));
          setSelectedToDelete(null);
        }}
        onCancel={() => setSelectedToDelete(null)}
      />
    </div>
  );
}
