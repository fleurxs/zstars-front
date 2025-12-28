// Сервис для работы с Яндекс Метрикой
declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: any[]) => void;
  }
}

class YandexMetrikaService {
  private getCounterId(): number | null {
    const yandexMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
    if (!yandexMetrikaId) {
      return null;
    }
    const counterId = parseInt(yandexMetrikaId, 10);
    return isNaN(counterId) ? null : counterId;
  }

  private isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.ym && !!this.getCounterId();
  }

  /**
   * Отправляет цель (reachGoal) в Яндекс Метрику
   * @param goalName - название цели
   */
  public reachGoal(goalName: string): void {
    if (!this.isAvailable() || !window.ym) {
      return;
    }

    const counterId = this.getCounterId();
    if (!counterId) {
      return;
    }

    try {
      window.ym(counterId, 'reachGoal', goalName);
    } catch (error) {
      console.warn('Yandex Metrika reachGoal error:', error);
    }
  }

  /**
   * Отправляет событие клика по кнопке оплаты
   */
  public trackPaymentClick(): void {
    this.reachGoal('payment_click');
  }

  /**
   * Отправляет событие успешной валидации username
   */
  public trackUsernameValidated(): void {
    this.reachGoal('username_validated');
  }

  /**
   * Отправляет событие успешного завершения оплаты
   */
  public trackPaymentCompleted(): void {
    this.reachGoal('payment_completed');
  }

  /**
   * Отправляет событие провального завершения оплаты
   */
  public trackPaymentFailed(): void {
    this.reachGoal('payment_failed');
  }
}

// Экспортируем singleton instance
export const yandexMetrika = new YandexMetrikaService();
