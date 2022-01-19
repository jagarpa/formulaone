import { Pipe, PipeTransform } from '@angular/core';
import { ICircuit } from '../interfaces/icircuit';

@Pipe({
  name: 'circuitFilter'
})

export class CircuitFilterPipe implements PipeTransform {

  transform(circuits: ICircuit[], filterText: string): ICircuit[] {
    const filter = filterText ? filterText.toLowerCase() : null;
    return filter ?
      circuits.filter(element => element.circuitName.toLowerCase().includes(filter)) : circuits;
  }
}
