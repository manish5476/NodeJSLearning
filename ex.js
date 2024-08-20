// // const fs = require('fs');
// const express = require('express');
// const app = express();
// app.use(express.json());
// const router = express.Router();
// const userController = require('./../Controlers/userControler');

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);
// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);
// //

// module.exports = router;
// //controller userControler
// const fs = require('fs');
// // const express = require('express');
// // const app = express();
// // app.use(express.json());

// exports.getAllUsers = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not createed',
//   });
// };
// exports.createUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not createed',
//   });
// };
// exports.getUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not createed',
//   });
// };
// exports.updateUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not createed',
//   });
// };
// exports.deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not createed',
//   });
// };
// //tour Routes
// // const fs = require('fs');
// const express = require('express');
// const router = express.Router();
// const app = express();
// app.use(express.json());
// const tourController = require('./../Controlers/tourControler');

// router.param('id', tourController.checkId);
// router
//   .route('/')
//   .get(tourController.getAllTours)
//   .post(tourController.checkBody, tourController.postTours);
// router
//   .route('/:id')
//   .get(tourController.getToursId)
//   .patch(tourController.UpdateTours)
//   .delete(tourController.deleteTours);

// // too heavy  watch  this route
// module.exports = router;

// //tour Routes controller
// const fs = require('fs');
// const express = require('express');
// const router = express.Router();

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
// );

// exports.checkId = (req, res, next, val) => {
//   console.log(`the Tour id is ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: 'fail',
//       response: 'bad request',
//     });
//   }
//   next();
// };
// //
// exports.getAllTours = (req, res) => {
//   res.status(200).json({
//     Status: 'success',
//     result: tours.length,
//     requestedAt: req.getTime,
//     data: { tours },
//   });
// };
// //
// exports.getToursId = (req, res) => {
//   console.log(req.params);
//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id);

//   res.status(200).json({
//     Status: 'success',
//     result: tours.length,
//     data: { tour },
//   });
// };
// //
// exports.UpdateTours = (req, res) => {
//   res.status(200).json({
//     Status: 'success',
//     message: 'Data updated successfully',
//   });
// };
// //
// exports.postTours = (req, res) => {
//   const newId = tours[tours.length - 1].id + 1;
//   const newTours = Object.assign({ id: newId }, req.body);
//   tours.push(newTours);

//   fs.writeFile(
//     `${__dirname}/../dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       console.log(err);
//     }
//   );
//   res.send('Hello post is done!');
// };
// //
// exports.deleteTours = (req, res) => {
//   res.status(200).json({
//     Status: 'success',
//     message: 'Data deleted successfully',
//     data: null,
//   });
// };

// //app.json
// // const fs = require('fs');
// const express = require('express');
// const app = express();
// app.use(express.json());
// const morgan = require('morgan');

// const tourRoutes = require('./Router/tourRoutes');
// const usersRoutes = require('./Router/userRoutes');

// // ___________________________________________________________________________________________________________________________
// app.use(morgan('combined'));
// const customFormat =
//   ':method :url :status :res[content-length] - :response-time ms';
// app.use((req, res, next) => {
//   console.log('Manish');
//   next();
// });
// app.use((req, res, next) => {
//   req.getTime = new Date().toISOString();
//   next();
// });
// // ________________________________________________________________________________________________________________________

// app.use('/api/v1/users', usersRoutes);
// app.use('/api/v1/tours', tourRoutes);

// module.exports = app;
import { Component } from '@angular/core';
import { diamond } from '@igniteui/material-icons-extended';
import { MastersService } from 'src/core/services/masters.service';
import { AuthService } from 'src/core/services/auth.service';
import * as _ from 'underscore';
interface designfolio {
  name: string;
  code: string;
}
@Component({
  selector: 'app-pd-entry-page',
  templateUrl: './pd-entry-page.component.html',
  styleUrls: ['./pd-entry-page.component.scss']
})

export class PdEntryPageComponent {
  public value: any
  designfolio: designfolio[] | undefined;
  selected_designfolio: any | undefined;
  public header_dropdown = {
    designfolio: [
      { name: 'Manual', code: 'MN' },
      { name: 'Mvesdanual', code: 'MwN' },
      { name: 'wavfd', code: 'wMN' },
    ]
  }
  public newRow: any
  public PDEntryPageObj = {
    ProjectDetail: {
      project_id: '',
      entry_date: '',
      project_name: '',
      project_leader: '',
      collection: '',
      sub_collection: '',
      category: '',
      sub_category: '',
      finish_date: ''
    },
    DesignerDetails: {
      design_no: '',
      designer_point: '',
      design_selection_date: '',
      designer: '',
      cad_design: '',
      designer_date: '',
      cad_designer_date: '',
      issue_date: ''
    },
    ProductDetails: {
      product_size: '',
      product_type: '',
      reference_no: '',
      gender: '',
      stud_part_length: '',
      core: '',
      design_source: '',
      product_length: '',
      product_width: '',
      product_height: '',
      product_guage: '',
      design_mechanism: '',
    },
    MaterialDetails: {
      from_metal_weight: '',
      to_metal_weight: '',
      from_diamond_weight: '',
      to_diamond_weight: '',
      metal_color: '',
    }
    , OtherDetails: {
      customer_exclusive: '',
      not_allow: '',
      isvalid: true || 'boolean',
      valid_remark: '',

    },
    Metal: [{
      metal_name: '',
      mttype_name: '',
      mtkt_name: '',
      color_name: '',
      weight: '',
      isEditable: false
    }],
    Component: [{
      type_desc: '',
      description: '',
      size: '',
      mtype_name: '',
      mtkt_name: '',
      color_name: '',
      unit: '',
      pcs: '',
      std_wt: '',
      weight: '',
      lab: '',
      labour: '',
      isEditable: false

    }],
    Stone: [{
      type: '',
      stone_type: '',
      shape: '',
      quality: '',
      color_name: '',
      cut: '',
      size: '',
      new_size: '',
      unit: '',
      pcs: '',
      std_wt: '',
      weight: '',
      lab: '',
      labour_type: '',
      fix_size: '',
      wx_qty: '',
      hnd_qty: '',
      v_tapperr: '',
      isEditable: false

    }],
    Material: [{
      type_desc: '',
      description: '',
      size: '',
      color_name: '',
      unit: '',
      pcs: '',
      weight: '',
      lab: '',
      labour_type: '',
      isEditable: false

    }],
    Labour: [{
      type_desc: '',
      lab_desc: '',
      unit: '',
      isEditable: false
    }],
    config: {
      metal: {
        golden: true,
        silver: true
      },
      stone: {
        diamond: true,
        color_stone: true
      },
      color: {
        value: ''
      }
    }
  }
  public pdentrydata: any;
  public pdentryColumns: any;
  public showmetalstoggle: any | boolean;
  public showComponenttoggle: any | boolean
  public showStonetoggle: any | boolean
  public showMaterialtoggle: any | boolean
  public showLabourtoggle: any | boolean
  public activeGridIndex = 0;
  public newObj: any
  public dropdownData: any
  public index: any
  // 
  ngOnInit() {
    this.pdentrydata = this.getPDEntrydata();
    this.pdentryColumns = this.returnPdEntryCol();
    this.showmetalstoggle = true,
      this.dropdownData = this.returnDropDownData()
  }

  constructor(private masterService: MastersService, private AuthService: AuthService) {
  }

  showGrid(index: number) {
    this.activeGridIndex = index;
  }
  returnDropDownData() {
    return {
      stoneType: this.masterService.setDropdownArrayList(_.flatten(this.AuthService.getAutoPopulateDetails('stone_type')), 'stone_type_name', 'stone_type_id', []),
      collection: this.masterService.setDropdownArrayList(_.flatten(this.AuthService.getAutoPopulateDetails('collection')), 'collection_name', 'collection_id', []),
      subcollection: this.masterService.setDropdownArrayList(_.flatten(this.AuthService.getAutoPopulateDetails('sub_collection')), 'collection_type_name', 'collection_type_id', []),
      category: this.masterService.setDropdownArrayList(_.flatten(this.AuthService.getAutoPopulateDetails('category')), 'product_category_name', 'product_category_id', []),
      designers: this.masterService.setDropdownArrayList(_.flatten(this.AuthService.getAutoPopulateDetails('designers')), 'user_fullname', 'user_code', []),
      metal_color: this.masterService.setDropdownArrayList(_.flatten(this.AuthService.getAutoPopulateDetails('metal_color')), 'metal_color_name', 'metal_color_id', []),
      metal_kt: this.masterService.setDropdownArrayList(_.flatten(this.AuthService.getAutoPopulateDetails('metal_karatage')), 'metal_karatage_name', 'metal_karatage_id', []),

    }
  }

  returnPdEntryCol() {
    return {
      labourcol: this.getPdentryLabourCol(),
      materialcol: this.getPdentryMaterialCol(),
      stoneCol: this.getPdentryStoneCol(),
      componentcol: this.getPdentryComponentCol(),
      metalCol: this.getPdentryMetalCol(),
    }
  }

  getPDEntrydata() {
    return {
      getPdentryMetal_Column_data: '',
      getPdentryComponent_Column_data: '',
      getPdentryStone_Column_data: '',
      getPdentryMaterial_Column_data: '',
      getPdentryLabour_Column_data: ''
    }
  }
  getPdentryMetalCol() {
    let col: any = [
      { index: 1, header: 'Sr.', field: 'index', key: 'index', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'index' },
      { index: 3, header: 'Metal Name', field: 'metal_name', key: 'project_key', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'sting', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'doubleClickEditableText' },
      { index: 4, header: 'Metaltype Name', field: 'mttype_name', key: 'project_name', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'doubleClickEditableText' },
      { index: 9, header: 'Metal Kt name', field: 'mtkt_name', key: 'Project_Coorrdinator_name', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'doubleClickEditableText' },
      { index: 5, header: 'Color name', field: 'color_name', key: 'project_head', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'doubleClickEditableText' },
      { index: 7, header: 'Weight', field: 'weight', key: 'collection_name', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'doubleClickEditableText' },
    ];
    return {
      primaryKey: 'index',
      columns: col,
      rowStyles: true,
      // isLoading: true,
      allowFiltering: false,
      // filterMode: 'excelStyleFilter',
      toolbarTitle: 'Metal',
      doubleclick: true,
    }
  }
  getPdentryComponentCol() {
    let col: any = [
      { index: 1, header: 'Sr.', field: 'index', key: 'index', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'index' },
      { index: 3, header: 'type_desc', field: 'type_desc', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 4, header: 'description', field: 'description', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 3, header: 'Size', field: 'size', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 4, header: 'Metaltype Name', field: 'mttype_name', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 9, header: 'Metal Kt name', field: 'mtkt_name', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'Color name', field: 'color_name', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'Unit', field: 'unit', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'pcs', field: 'pcs', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'std_wt', field: 'std_wt', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 7, header: 'Weight', field: 'weight', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 3, header: 'lab', field: 'lab', key: 'project_key', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 7, header: 'labour', field: 'labour', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },

    ];
    return {
      primaryKey: 'index',
      columns: col,
      rowEditable: true,
      rowStyles: true,
      toolbarTitle: 'Component', doubleclick: true,

    }
  }
  getPdentryStoneCol() {
    let col: any = [
      { index: 1, header: 'Sr.', field: 'index', key: 'index', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'index' },
      { index: 3, header: 'type', field: 'type', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 4, header: 'stone_type', field: 'stone_type', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 3, header: 'shape', field: 'shape', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 4, header: 'quality', field: 'quality', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 9, header: 'color_name', field: 'color_name', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'cut', field: 'cut', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'size', field: 'size', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'new_size', field: 'new_size', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'unit', field: 'unit', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'pcs', field: 'pcs', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'std_wt', field: 'std_wt', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 7, header: 'Weight', field: 'weight', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 3, header: 'lab', field: 'lab', key: 'project_key', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 7, header: 'labour Type', field: 'labour_type', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'fix_size', field: 'fix_size', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'wx_qty', field: 'wx_qty', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'hnd_qty', field: 'hnd_qty', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'v_tapperr', field: 'v_tapperr', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },

    ];
    return {
      primaryKey: 'index',
      columns: col,
      rowStyles: true,
      allowFiltering: false,
      toolbarTitle: 'Stone',
      doubleclick: true,

    }
  }
  getPdentryMaterialCol() {
    let col: any = [
      { index: 1, header: 'Sr.', field: 'index', key: 'index', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'index' },
      { index: 3, header: 'type_desc', field: 'type_desc', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 4, header: 'description', field: 'description', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 3, header: 'Size', field: 'size', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'Color name', field: 'color_name', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'Unit', field: 'unit', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'pcs', field: 'pcs', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 7, header: 'Weight', field: 'weight', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 3, header: 'lab', field: 'lab', key: 'project_key', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 7, header: 'labour Type', field: 'labour_type', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },

    ];
    return {
      primaryKey: 'index',
      columns: col,
      rowStyles: true,
      allowFiltering: false,
      toolbarTitle: 'Material',
    }
  }
  getPdentryLabourCol() {
    let col: any = [
      { index: 1, header: 'Sr.', field: 'index', key: 'index', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'index' },
      { index: 3, header: 'type_desc', field: 'type_desc', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 3, header: 'lab_desc', field: 'lab_desc', key: 'project_key', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
      { index: 5, header: 'Unit', field: 'unit', key: '', visible: '', width: 'auto', movable: true, pinned: false, sortable: false, resizable: true, editable: false, filter: false, groupable: false, summary: false, summaryName: '', dataType: 'string', customCellClasses: '', isOverrideByInnerHtml: false, textHtml: '', headerClass: 'text-center', className: 'text-center', typeOfCol: 'editableTextBox' },
    ];
    return {
      primaryKey: 'index',
      columns: col,
      rowStyles: true,
      allowFiltering: false,
      toolbarTitle: 'Labour', doubleclick: true,

    }
  }
  updateIsEditable(arr: any) {
    return arr.map((obj: { isEditable: boolean; }) => {
      if (obj.isEditable === true) {
        return obj;
      } else {
        return { ...obj, isEditable: false };
      }
    });
  }

  eventFromSingleHeaderGrid(event: any) {
    console.log(event);
    switch (event.eventType) {
      case 'dblClick':
        event.data.isEditable = true;
        if (event.grid.toolbarTitle === "Metal") {
          this.PDEntryPageObj.Metal.findIndex((ele: any)=>{
            
          })
        }
        break;
      case 'tabClick':
        if (event.col && event.data && event.event) {
          var col = event.grid.columns;
          var field = event.col.field;
          if (!col || col.length === 0) {
            return;
          }
          const isLastColumn = field === col[col.length - 1].field;
          if ((event.event.key === 'Enter' || (event.event.key === 'Tab')) && isLastColumn) {
            this.newRow = col.reduce((acc: any, col: any) => {
              acc[col.field] = "";
              return acc;
            }, {});
            this.newRow.isEditable = true;
            if (event.grid.toolbarTitle === "Metal") {
              this.PDEntryPageObj.Metal.push(this.newRow);
              if (this.PDEntryPageObj.Metal.length > 1) {
                this.PDEntryPageObj.Metal[this.PDEntryPageObj.Metal.length - 2].isEditable = false;
              }
            } else if (event.grid.toolbarTitle === "Component") {
              this.PDEntryPageObj.Component.push(this.newRow);
              if (this.PDEntryPageObj.Component.length > 1) {
                this.PDEntryPageObj.Component[this.PDEntryPageObj.Component.length - 2].isEditable = false;
              }
            } else if (event.grid.toolbarTitle === "Stone") {
              this.PDEntryPageObj.Stone.push(this.newRow);
              if (this.PDEntryPageObj.Stone.length > 1) {
                this.PDEntryPageObj.Stone[this.PDEntryPageObj.Stone.length - 2].isEditable = false;
              }
            } else if (event.grid.toolbarTitle === "Material") {
              this.PDEntryPageObj.Material.push(this.newRow);
              if (this.PDEntryPageObj.Material.length > 1) {
                this.PDEntryPageObj.Material[this.PDEntryPageObj.Material.length - 2].isEditable = false;
              }
            } else if (event.grid.toolbarTitle === "Labour") {
              this.PDEntryPageObj.Labour.push(this.newRow);
              if (this.PDEntryPageObj.Labour.length > 1) {
                this.PDEntryPageObj.Labour[this.PDEntryPageObj.Labour.length - 2].isEditable = false;
              }
            }
          }
        }
        break;
      default:
    }



  }


  // 



  payload() {
    console.log(this.PDEntryPageObj);
  }
}