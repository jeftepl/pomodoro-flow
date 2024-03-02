import { useRecoilState } from 'recoil';
import { tasksState, watchState } from '@state/atom';
import { IWatch } from '@interfaces/IWatch';
import { ITask } from '@interfaces/ITask';
import { formatSecondsToString, formatStringToSeconds } from '@common/utils/timeFormatter';
import useGetSelectedTask from './useGetSelectedTask';

export default function useStopWatch() {
  const [watch, setWatch] = useRecoilState<IWatch>(watchState);
  const [tasks, setTasks] = useRecoilState<ITask[]>(tasksState);

  const selectedTask: ITask | null = useGetSelectedTask();

  function updateWatchState(timePassedInSeconds: number) {
    setWatch({ ...watch, initialValue: watch.initialValue - timePassedInSeconds, run: false });
  }

  function updateTasksState(remainingTimeString: string) {
    return tasks.map((task) => {
      if (task.id === selectedTask?.id) {
        return {
          ...task,
          remainingTime: remainingTimeString,
        };
      }
      return task;
    });
  }

  return () => {
    if (selectedTask?.completed) {
      return;
    }

    let remainingTimeString = formatSecondsToString(watch.value);
    const timePassedInSeconds = watch.initialValue - watch.value;

    if (selectedTask) {
      const remainingTimeInSeconds = formatStringToSeconds(selectedTask.remainingTime);
      const remainingValueInSeconds = remainingTimeInSeconds - timePassedInSeconds;
      remainingTimeString = formatSecondsToString(remainingValueInSeconds);

      setTasks(updateTasksState(remainingTimeString));
    }

    updateWatchState(timePassedInSeconds);
  };
}
