import { Pipe, PipeTransform } from '@angular/core';
import { Idriver } from '../interfaces/idriver';

@Pipe({
  name: 'driverFilter'
})
export class DriverFilterPipe implements PipeTransform {

  transform(drivers: Idriver[], filterText: string): Idriver[] {
    const filter = filterText ? filterText.toLowerCase() : null;
    return filter ?
      drivers.filter(element => element.completeName.toLowerCase().includes(filter)) : drivers;
  }

}
