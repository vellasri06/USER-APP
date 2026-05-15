import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'km'
})
export class KmPipe implements PipeTransform {

 transform(value:number) {

  return value/1000 ;

 }

}