import React from 'react';
import { exams } from '../../../data/exams';
import ExamDetailClient from './ExamDetailClient';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return exams.map((exam) => ({
    id: exam.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const exam = exams.find((e) => e.id === params.id);
  if (!exam) return { title: 'Exam Not Found' };
  
  return {
    title: `${exam.name} Exam Date & Details | After Inter`,
    description: `Complete guide for ${exam.fullName}. Application dates, fee, syllabus and top colleges accepting ${exam.name}.`,
    openGraph: {
      title: `${exam.name} 2025 Details`,
      description: exam.description,
    }
  };
}

export default function Page({ params }: { params: { id: string } }) {
  const exam = exams.find((e) => e.id === params.id);

  if (!exam) {
    return <div className="p-20 text-center font-bold text-xl">Exam not found</div>;
  }

  return <ExamDetailClient exam={exam} />;
}