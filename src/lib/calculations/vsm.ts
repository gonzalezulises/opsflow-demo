export interface ProcessStep {
  processTimeMinutes: number;
  waitTimeHours: number;
  reworkPercentage: number;
  addsValue: boolean;
}

export interface VSMResult {
  leadTimeHours: number;
  leadTimeDays: number;
  totalProcessTimeMinutes: number;
  totalProcessTimeHours: number;
  totalWaitTimeHours: number;
  valueAddTimeMinutes: number;
  valueAddTimeHours: number;
  nonValueAddTimeMinutes: number;
  flowEfficiency: number;
  avgRework: number;
  stepsCount: number;
  valueAddStepsCount: number;
}

export function calculateVSM(
  steps: ProcessStep[],
  mode: "lean_correct" | "compatibility" = "lean_correct"
): VSMResult {
  const totalProcessTimeMinutes = steps.reduce((sum, s) => sum + s.processTimeMinutes, 0);
  const totalWaitTimeHours = steps.reduce((sum, s) => sum + s.waitTimeHours, 0);
  const totalProcessTimeHours = totalProcessTimeMinutes / 60;

  const leadTimeHours = totalProcessTimeHours + totalWaitTimeHours;
  const leadTimeDays = leadTimeHours / 24;

  const valueAddTimeMinutes =
    mode === "lean_correct"
      ? steps.filter((s) => s.addsValue).reduce((sum, s) => sum + s.processTimeMinutes, 0)
      : totalProcessTimeMinutes;

  const valueAddTimeHours = valueAddTimeMinutes / 60;
  const nonValueAddTimeMinutes = totalProcessTimeMinutes - (mode === "lean_correct" ? valueAddTimeMinutes : 0);
  const flowEfficiency = leadTimeHours > 0 ? (valueAddTimeHours / leadTimeHours) * 100 : 0;
  const avgRework = steps.length > 0 ? steps.reduce((sum, s) => sum + s.reworkPercentage, 0) / steps.length : 0;
  const valueAddStepsCount = steps.filter((s) => s.addsValue).length;

  return {
    leadTimeHours: round(leadTimeHours),
    leadTimeDays: round(leadTimeDays),
    totalProcessTimeMinutes: round(totalProcessTimeMinutes),
    totalProcessTimeHours: round(totalProcessTimeHours),
    totalWaitTimeHours: round(totalWaitTimeHours),
    valueAddTimeMinutes: round(valueAddTimeMinutes),
    valueAddTimeHours: round(valueAddTimeHours),
    nonValueAddTimeMinutes: round(nonValueAddTimeMinutes),
    flowEfficiency: round(flowEfficiency),
    avgRework: round(avgRework),
    stepsCount: steps.length,
    valueAddStepsCount,
  };
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
