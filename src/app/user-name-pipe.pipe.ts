import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userNamePipe'
})
export class UserNamePipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return JSON.parse(value.attributes).name;
  }

}
