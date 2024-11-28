import { Subject } from 'rxjs'
import { filter, take } from 'rxjs/operators'

/**
 * Keeps track of what a task should do and where the output should be delivered
 */
export interface Task<T> {
  output: Subject<T>
  execute: () => Promise<T>
}

/**
 * Used to execute a number of async tasks
 */
export class ExecutionQueue<T> {
  /**
   * An array of all the tasks wich need to be executed
   */
  private tasks: Task<T>[] = []

  /**
   * Keeps track of the current task
   */
  private current: Promise<T> | null

  /**
   * Whether the tasks should continue being executed
   */
  public active = true

  /**
   * Adds a new task to the queue
   *
   * @param task The task to add
   */
  public push(task: () => Promise<T>) {
    const executionSubject = new Subject<T>()
    const executionPromise = executionSubject.pipe(take(1)).toPromise()

    this.tasks.push({
      output: executionSubject,
      execute: task
    })

    if (!this.current) {
      this.next()
    }

    return executionPromise
  }

  /**
   * Executes the next task in the queue
   */
  private next() {
    const task = this.tasks.shift()

    if (task) {
      this.current = task.execute()

      this.current.then((result) => {
        task.output.next(result)

        if (this.active) {
          this.next()
        }
      })
    } else {
      this.current = null
    }
  }
}
