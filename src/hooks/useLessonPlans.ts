// hooks/useLessonPlans.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import lessonPlanApi from '../api/lessonPlanApi';
import type { LessonPlan } from '../types/LessonPlan';

export const useLessonPlans = (classId?: number) => {
    const queryClient = useQueryClient();

    const lessonPlansQuery = useQuery<LessonPlan[], Error>({
        queryKey: ['lessonPlans', classId],
        queryFn: async () => {
            if (!classId) return [];
            return lessonPlanApi.getLessonPlansByClass(classId); // /api/auth/lesson-plans/class/{classId}
        },
        enabled: !!classId,
        staleTime: 1000 * 60 * 5,
    });

    const createMutation = useMutation({
        mutationFn: (data: LessonPlan) => lessonPlanApi.create(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lessonPlans', classId] }),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: LessonPlan }) => lessonPlanApi.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lessonPlans', classId] }),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => lessonPlanApi.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lessonPlans', classId] }),
    });

    const importMutation = useMutation({
        mutationFn: (file: File) => {
            if (!classId) throw new Error('classId required');
            return lessonPlanApi.importLessonPlans(classId, file);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lessonPlans', classId] }),
    });

    return {
        lessonPlans: lessonPlansQuery.data || [],
        isLoading: lessonPlansQuery.isLoading,
        isError: lessonPlansQuery.isError,
        createLessonPlan: createMutation.mutateAsync,
        updateLessonPlan: updateMutation.mutateAsync,
        deleteLessonPlan: deleteMutation.mutateAsync,
        importLessonPlans: importMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isImporting: importMutation.isPending,
    };
};
