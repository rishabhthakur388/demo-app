/**
 * Calculate available appointment slots for a given treatment duration.
 * Working day is fixed from 09:00 to 17:00 (8 hours).
 * Slots start every 30 minutes.
 * Returns an array of ISO timestamp strings for slot start times that fit entirely within the day.
 *
 * @param {number} durationMs - Treatment duration in milliseconds.
 * @returns {Promise<string[]>} - Array of ISO strings.
 */
export async function getAvailableSlots(durationMs) {
  return new Promise((resolve, reject) => {
    // Validate input
    if (typeof durationMs !== "number" || Number.isNaN(durationMs) || durationMs <= 0) {
      return reject(new TypeError("durationMs must be a positive number"));
    }

    const SLOT_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes
    const workDayStart = new Date();
    workDayStart.setHours(9, 0, 0, 0);
    const workDayEnd = new Date(workDayStart);
    workDayEnd.setHours(17, 0, 0, 0);

    const latestStart = new Date(workDayEnd.getTime() - durationMs);
    const slots = [];
    for (let t = new Date(workDayStart); t <= latestStart; t = new Date(t.getTime() + SLOT_INTERVAL_MS)) {
      slots.push(new Date(t).toISOString());
    }
    resolve(slots);
  });
}
