import { trigger, state, style, animate, transition } from '@angular/animations';

export function flyInOUt() {
  return trigger('flyInOut', [
    state('*', style({ transform: 'translateX(0)', opacity: 1 })),
    transition(':enter', [  // :enter es lo mismo que void => *
      style({ transform: 'translateX(-100%)', opacity: 0 }), // Estilo inicial de la transición
      animate('1s ease-in') 
    ]),
    transition(':leave', [
      animate("1s ease-out", style({ transform: 'translateX(100%)', opacity: 0 })) 
      // el style interior da el estado final de la transición
    ])
  ]);
}