import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderCount'
})
export class GenderCountPipe implements PipeTransform {

transform(students: any[], gender: string): number {
    if (!students) return 0;
    return students.filter(u =>
      u.gender?.toLowerCase() === gender.toLowerCase()
    ).length;
  }

}
