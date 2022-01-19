import { Pipe, PipeTransform } from '@angular/core';
import { ICircuit } from '../interfaces/icircuit';

@Pipe({
  name: 'circuitFilterByName',
  pure: false
})
export class CircuitFilterByNamePipe implements PipeTransform {

  transform(value: ICircuit[]): any {
    let circuitsList: ICircuit[] = [];
    value.map((element => {
      if (element.circuitName.includes("Barcelona")) {
        circuitsList.push(element)
      }
    }))
    return circuitsList;

  }

}
