/**
 * Classes Module
 */
import { AppUI } from '../utils/ui.js';

export interface Class {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  materialUrl?: string;
  moduleId: string;
  createdAt: string;
}

export const Classes = {
  /**
   * Buscar aula por ID
   */
  getById: async (classId: string): Promise<Class> => {
    try {
      const response = await AppUI.apiFetch(`/classes/${classId}`, {
        method: 'GET',
      });

      return response.data || response;
    } catch (error: any) {
      AppUI.showMessage(error.message || 'Erro ao carregar aula', 'error');
      throw error;
    }
  },

  /**
   * Atualizar aula
   */
  update: async (
    classId: string,
    data: {
      title?: string;
      description?: string;
      videoUrl?: string;
    },
  ): Promise<Class> => {
    try {
      const response = await AppUI.apiFetch(`/classes/${classId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });

      return response.data;
    } catch (error: any) {
      AppUI.showMessage(error.message || 'Erro ao atualizar aula', 'error');
      throw error;
    }
  },

  /**
   * Deletar aula
   */
  delete: async (classId: string): Promise<boolean> => {
    const confirmed = await AppUI.promptModal(
      'Excluir Aula',
      'Tem certeza que deseja excluir esta aula? Esta ação não pode ser desfeita.',
    );

    if (!confirmed) return false;

    try {
      await AppUI.apiFetch(`/classes/${classId}`, {
        method: 'DELETE',
      });

      return true;
    } catch (error: any) {
      AppUI.showMessage(error.message || 'Erro ao excluir aula', 'error');
      return false;
    }
  },

  /**
   * Upload de material complementar
   */
  uploadMaterial: async (classId: string, file: File): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`/classes/${classId}/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.message || data.error || 'Erro ao fazer upload do material',
        );
      }

      AppUI.showMessage(
        'Material complementar enviado com sucesso!',
        'success',
      );
    } catch (error: any) {
      AppUI.showMessage(
        error.message || 'Erro ao fazer upload do material',
        'error',
      );
      throw error;
    }
  },

  /**
   * Marcar aula como concluída (para estudantes)
   */
  markAsCompleted: async (
    classId: string,
    completed: boolean,
  ): Promise<void> => {
    try {
      const response = await AppUI.apiFetch(`/classes/${classId}/progress`, {
        method: 'POST',
        body: JSON.stringify({ completed }),
      });

      AppUI.showMessage(
        completed ? 'Aula marcada como concluída!' : 'Progresso atualizado',
        'success',
      );
    } catch (error: any) {
      AppUI.showMessage(
        error.message || 'Erro ao atualizar progresso',
        'error',
      );
      throw error;
    }
  },

  /**
   * Remover conclusão da aula
   */
  removeProgress: async (classId: string): Promise<void> => {
    try {
      await AppUI.apiFetch(`/classes/${classId}/progress`, {
        method: 'DELETE',
      });

      AppUI.showMessage('Progresso removido!', 'info');
    } catch (error: any) {
      AppUI.showMessage(error.message || 'Erro ao remover progresso', 'error');
      throw error;
    }
  },
};
