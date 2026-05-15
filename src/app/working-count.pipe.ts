import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workingCount'
})
export class WorkingCountPipe implements PipeTransform {

transform(students: any[], isWorking: boolean): number {
    if (!students) return 0;
    return students.filter(u => u.working === isWorking).length;
  }
}
