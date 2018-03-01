import {Injectable} from '@angular/core'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Injectable()
export class ModalService {
  constructor(private ngbModal: NgbModal) {
  }

  open(content: any, config?: any) {
    let modal = this.ngbModal.open(content, config);
    let instance = (modal as any)._windowCmptRef.instance;
    setImmediate(() => {
      instance.windowClass = 'custom-show'
    });

    let fx = (modal as any)._removeModalElements.bind(modal);
    (modal as any)._removeModalElements = () => {
      instance.windowClass = '';
      setTimeout(fx, 250)
    };

    return modal
  }
}