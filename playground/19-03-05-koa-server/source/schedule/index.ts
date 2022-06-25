import * as schedule from 'node-schedule';

const rule = new schedule.RecurrenceRule();

Object.assign(rule, {
  dayOfWeek: [0, new schedule.Range(1, 6)],
  hour: 0,
  minute: 0,
});

schedule.scheduleJob(rule, () => {
  // 每日任务
});
