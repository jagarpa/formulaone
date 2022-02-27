import { Pipe, PipeTransform } from '@angular/core';
import { Iconstructor } from '../interfaces/iconstructor';

@Pipe({
  name: 'constructorFilter'
})
export class ConstructorFilterPipe implements PipeTransform {

  transform(constructors: Iconstructor[], filterText: string): Iconstructor[] {
    const filter = filterText ? filterText.toLowerCase() : null;
    return filter ?
      constructors.filter(element => element.name.toLowerCase().includes(filter)) : constructors;
  }


}
