const sections = {
  '12.1': {
    title: "Structural Design Basis",
    subsections: {
      '12.1.1': {
        title: 'Basic Requirements',
        imgs: ['12.1.1.png']
      },
      '12.1.2': {
        title: 'Member Design, Connection Design, and Deformation Limit',
        imgs: ['12.1.2.png']
      },
      '12.1.3': {
        title: 'Continuous Load Path and Interconnection',
        imgs: ['12.1.3_1.png', '12.1.3_2.png']
      },
      '12.1.4': {
        title: 'Connection to Supports',
        imgs: ['12.1.4.png']
      },
      '12.1.5': {
        title: 'Foundation Design',
        imgs: ['12.1.5.png']
      },
      '12.1.6': {
        title: 'Material Design and Detailing Requirements',
        imgs: ['12.1.6.png']
      },
    },
  },
  '12.2': {
    title: "Structural System Selection",
    subsections: {
      '12.2.1': {
        title: 'Selection and Limitations',
        imgs: ['12.2.1_1.png', '12.2.1_2.png', '12.2.1.1.png', '12.2.1.2_1.png', '12.2.1.2_2.png', 'table12.2-1_1.png', 'table12.2-1_2.png', 'table12.2-1_3.png', 'table12.2-1_4.png', 'table12.2-1_5.png', 'table12.2-1_6.png']
      },
      'table12.2-1' : {
        title: 'Design Coefficients and Factors for Seismic Force-Resisting Systems',
        imgs: ['table12.2-1_1.png', 'table12.2-1_2.png', 'table12.2-1_3.png', 'table12.2-1_4.png', 'table12.2-1_5.png', 'table12.2-1_6.png']
      },
      '12.2.2': {
        title: 'Combinations of Framing Systems in Different Directions',
        imgs: ['12.2.2.png']
      },
      '12.2.3': {
        title: 'Combinations of Framing Systems in the Same Direction',
        imgs: ['12.2.3.png', '12.2.3.1.png', '12.2.3.2_1.png', '12.2.3.2_2.png', '12.2.3.3.png']
      },
      '12.2.4': {
        title: 'Combination Framing Detailing Requirements',
        imgs: ['12.2.4.png']
      },
      '12.2.5': {
        title: 'System-Specific Requirements',
        imgs: ['12.2.5.png', '12.2.5.1.png', '12.2.5.2.png', '12.2.5.3.png','12.2.5.4_1.png','12.2.5.4_2.png', '12.2.5.5.png', '12.2.5.6.1_1.png','12.2.5.6.1_2.png','12.2.5.6.2.png','12.2.5.7.1_1.png', '12.2.5.7.1_2.png', '12.2.5.7.2_1.png','12.2.5.7.2_1.png', '12.2.5.7.3.png', '12.2.5.8.png']
      },
    },
  },
  '12.3': {
    title: "Diaphragm Flexibility, Configuration Irregularities, and Redundancy",
    subsections: {
      '12.3.1': {
        title: 'Diaphragm Flexibility',
        imgs: ['12.3.1.1.png', '12.3.1.2.png', '12.3.1.3.png', 'figure12.3-1.png']
      },
      '12.3.2': {
        title: 'Irregular and Regular Classification',
        imgs: ['12.3.2.png', '12.3.2.1.png', '12.3.2.2_1.png', '12.3.2.2_2.png', 'table12.3-1_1.png', 'table12.3-1_2.png', 'table12.3-2.png']
      },
      'figure12.3-1' : {
        title: 'Flexible Diaphragm',
        imgs: ['figure12.3-1.png']
      },
      'table12.3-1' : {
        title: 'Horizontal Structural Irregularities',
        imgs: ['table12.3-1_1.png', 'table12.3-1_2.png']
      },
      'table12.3-2' : {
        title: 'Vertical Structural Irregularities',
        imgs: ['table12.3-2.png']
      },
      '12.3.3': {
        title: 'Limitations and Additional Requirements for Systems with Structural Irregularities',
        imgs: ['12.3.3.1.png', '12.3.3.2_1.png', '12.3.3.2_2.png', '12.3.3.3.png', '12.3.3.4.png', 'table12.3-3.png', 'figure12.3-2.png']
      },
      'table12.3-3' : {
        title: 'Requirements for Each Story Resisting More than 35% of the Base Shear',
        imgs: ['table12.3-3.png']
      },
      'figure12.3-2' : {
        title: 'Shear Wall and Wall Pier Height-to-Length Ratio Determination',
        imgs: ['figure12.3-2.png']
      },
      '12.3.4': {
        title: 'Redundancy',
        imgs: ['12.3.4.png','12.3.4.1.png', '12.3.4.2.png']
      },
    }
  },
  '12.4': {
    title: "Seismic Load Effects and Combinations",
    subsections: {
      '12.4.1': {
        title: 'Applicability',
        imgs: ['12.4.1.png']
      },
      '12.4.2': {
        title: 'Seismic Load Effect',
        imgs: ['12.4.2_1.png', '12.4.2_2.png', '12.4.2.1.png', '12.4.2.2.png']
      },
      '12.4.3': {
        title: 'Seismic Load Effects Including Overstrength',
        imgs: ['12.4.3_1.png', '12.4.3_2.png', '12.4.3.1.png', '12.4.3.2.png']
      },
      '12.4.4': {
        title: 'Minimum Upward Force for Horizontal Cantilevers for Seismic Design Categories D through F',
        imgs: ['12.4.4.png']
      },
    },
  },
  '12.5': {
    title: "Direction of Loading",
    subsections: {
      '12.5.1': {
        title: 'Direction of Loading Criteria',
        imgs: ['12.5.1.png']
      },
      '12.5.2': {
        title: 'Seismic Design Category B',
        imgs: ['12.5.2.png']
      },
      '12.5.3': {
        title: 'Seismic Design Category C',
        imgs: ['12.5.3.png', '12.5.3.1.png']
      },
      '12.5.4': {
        title: 'Seismic Design Categories D through F',
        imgs: ['12.5.4.png',]
      },
    },
  },
  '12.6': {
    title: "Analysis Procedure Selection",
    imgs: ['12.6.png'],
    subsections: {
      'table12.6-1' : {
        title: 'Permitted Analytical Procedures',
        imgs: ['table12.6-1.png']
      }
    }
  },
  '12.7': {
    title: "Modeling Criteria",
    subsections: {
      '12.7.1': {
        title: 'Foundation Modeling',
        imgs: ['12.7.1.png']
      },
      '12.7.2': {
        title: 'Effective Seismic Weight',
        imgs: ['12.7.2.png']
      },
      '12.7.3': {
        title: 'Structural Modeling',
        imgs: ['12.7.3_1.png', '12.7.3_2.png']
      },
      '12.7.4': {
        title: 'Interaction Effects',
        imgs: ['12.7.4.png']
      },
    },
  },
  '12.8': {
    title: "Equivalent Lateral Force (ELF) Procedure",
    subsections: {
      '12.8.1': {
        title: 'Seismic Base Shear',
        imgs: ['12.8.1.png', '12.8.1.1_1.png', '12.8.1.1_2.png', '12.8.1.1_3.png', '12.8.1.2.png', '12.8.1.3_1.png','12.8.1.3_2.png']
      },
      '12.8.2': {
        title: 'Period Determination',
        imgs: ['12.8.2.png', '12.8.2.1_1.png', '12.8.2.1_2.png', 'table12.8-1.png', 'table12.8-2.png']
      },
      'table12.8-1' : {
        title: 'Coefficient for Upper Limit on Calculated Period',
        imgs: ['table12.8-1.png']
      },
      'table12.8-2' : {
        title: 'Values of Approximate Period Parameters Ct and x',
        imgs: ['table12.8-2.png']
      },
      '12.8.3': {
        title: 'Vertical Distribution of Seismic Forces',
        imgs: ['12.8.3.png']
      },
      '12.8.4': {
        title: 'Horizontal Distribution of Forces',
        imgs: ['12.8.4_1.png', '12.8.4_2.png', '12.8.4.2.png', '12.8.4.3.png', 'figure12.8-1.png']
      },
      '12.8.5': {
        title: 'Overturning',
        imgs: ['12.8.5.png']
      },
      'figure12.8-1' : {
        title: 'Torsional Amplification Factor',
        imgs: ['figure12.8-1.png']
      },
      'figure12.8-2' : {
        title: 'Story Drift Determination',
        imgs: ['figure12.8-2.png']
      },
      '12.8.6': {
        title: 'Story Drift Determination',
        imgs: ['12.8.6_1.png', '12.8.6_2.png', '12.8.6.1.png', '12.8.6.2.png', 'figure12.8-2.png']
      },  
      '12.8.7': {
        title: 'P-Delta Effects',
        imgs: ['12.8.7_1.png', '12.8.7_2.png']
      },
    },
  },
  '12.9': {
    title: "Linear Dynamic Analysis",
    subsections: {
      '12.9.1': {
        title: 'Modal Response Spectrum Analysis',
        imgs: ['12.9.1.1.png', '12.9.1.2.png','12.9.1.3.png','12.9.1.4_1.png','12.9.1.4_2.png','12.9.1.5.png','12.9.1.6.png','12.9.1.7.png', '12.9.1.8.png']
      },
      '12.9.2': {
        title: 'Linear Response History Analysis',
        imgs: ['12.9.2.1.png', '12.9.2.2.png', '12.9.2.3_1.png', '12.9.2.3_2.png', '12.9.2.4.png', '12.9.2.5_1.png', '12.9.2.5_2.png', '12.9.2.5_3.png', '12.9.2.6.png', '12.9.2.7.png']
      },
    },
  },
  '12.10': {
    title: "Diaphragms, Chords, and Collectors",
    imgs: ["12.10.png"],
    subsections: {
      '12.10.1': {
        title: 'Diaphragm Design',
        imgs: ['12.10.1_1.png', '12.10.1_2.png', '12.10.1.1_1.png', '12.10.1.1_2.png']
      },
      '12.10.2': {
        title: 'Collector Elements',
        imgs: ['12.10.2.png', '12.10.2.1_1.png', '12.10.2.1_2.png', 'figure12.10-1.png']
      },
      'figure12.10-1' : {
        title: 'Collectors',
        imgs: ['figure12.10-1.png']
      },
      '12.10.3': {
        title: 'Alternative Design Provisions for Diaphragms, Including Chords and Collectors',
        imgs: ['12.10.3.png', '12.10.3.1.png', '12.10.3.2_1.png', '12.10.3.2_2.png', '12.10.3.2_3.png', '12.10.3.2_4.png', '12.10.3.3.png', '12.10.3.4.png', '12.10.3.5.png', 'figure12.10-2.png', 'table12.10-1.png']
      },
      'figure12.10-2' : {
        title: 'Calculating the Design Acceleration Coefficient Cpx in Buildings with N ≤ 2 and in Buildings with N ≥ 3',
        imgs: ['figure12.10-2.png']
      },
      'table12.10-1' : {
        title: 'Diaphragm Design Force Reduction Factor',
        imgs: ['table12.10-1.png']
      },
    },
  },
  '12.11': {
    title: "Structural Walls and Their Anchorage",
    subsections: {
      '12.11.1': {
        title: 'Design for Out-of-Plane Forces',
        imgs: ['12.11.1.png']
      },
      '12.11.2': {
        title: 'Wall Anchorage Forces',
        imgs: ['12.11.2.1_1.png', '12.11.2.1_2.png', '12.11.2.1_3.png', '12.11.2.2_1.png', '12.11.2.2_2.png', '12.11.2.2_3.png']
      },
    },
  },
  '12.12': {
    title: "Drift and Deformation",
    subsections: {
      '12.12.1': {
        title: 'Story Drift Limit',
        imgs: ['12.12.1.png', '12.12.1.1.png', 'table12.12-1.png']
      },
      '12.12.2': {
        title: 'Diaphragm Deflection',
        imgs: ['12.12.2.png']
      },
      '12.12.3': {
        title: 'Structural Separation',
        imgs: ['12.12.3_1.png', '12.12.3_2.png']
      },
      'table12.12-1' : {
        title: 'Allowable Story Drift',
        imgs: ['table12.12-1.png']
      },
      '12.12.4': {
        title: 'Members Spanning between Structures',
        imgs: ['12.12.4.png']
      },     
      '12.12.5': {
        title: 'Deformation Compatibility for Seismic Design Categories D through F',
        imgs: ['12.12.5.png']
      },
    },
  },
  '12.13': {
    title: "Foundation Design",
    subsections: {
      '12.13.1': {
        title: 'Design Basis',
        imgs: ['12.13.1.png']
      },
      '12.13.2': {
        title: 'Materials of Construction',
        imgs: ['12.13.2.png']
      },
      '12.13.3': {
        title: 'Foundation Load-Deformation Characteristics',
        imgs: ['12.13.3.png']
      },
      '12.13.4': {
        title: 'Reduction of Foundation Overturning',
        imgs: ['12.13.4.png']
      },
      '12.13.5': {
        title: ' Strength Design for Foundation Geotechnical Capacity',
        imgs: ['12.13.5.1_1.png', '12.13.5.1_2.png', '12.13.5.2.png','12.13.5.3.png', 'table12.13-1.png']
      },
      '12.13.6': {
        title: 'Allowable Stress Design for Foundation Geotechnical Capacity',
        imgs: ['12.13.6_1.png', '12.13.6_2.png']
      },  
      'table12.13-1' : {
        title: 'Resistance Factors for Strength Design of Soil–Foundation Interface',
        imgs: ['table12.13-1.png']
      },
      '12.13.7': {
        title: 'Requirements for Structures Assigned to Seismic Design Category C',
        imgs: ['12.13.7.png', '12.13.7.1.png', '12.13.7.2.png', '12.13.7.3.png']
      },
      '12.13.8': {
        title: 'Requirements for Structures Assigned to Seismic Design Categories D through F',
        imgs: ['12.13.8.png', '12.13.8.1.png', '12.13.8.2.png', '12.13.8.3.png', '12.13.8.4.png', '12.13.8.5.png', '12.13.8.6.png', '12.13.8.7.png', '12.13.8.8.png']
      },  
      '12.13.9': {
        title: 'Requirements for Foundations on Liquefiable Sites',
        imgs: ['12.13.9_1.png', 'table12.13-2.png', '12.13.9_2.png', '12.13.9.1.png', '12.13.9.2_1.png', 'table12.13-3.png', '12.13.9.2_2.png', '12.13.9.2_3.png', '12.13.9.2_4.png', '12.13.9.3_1.png', '12.13.9.3_2.png', '12.13.9.3_3.png', '12.13.9.3_4.png']
      },
      'table12.13-2' : {
        title: 'Upper Limit on Lateral Spreading Horizontal Ground Displacement for Shallow Foundations Beyond Which Deep Foundations Are Required',
        imgs: ['table12.13-2.png']
      },
      'table12.13-3' : {
        title: 'Differential Settlement Threshold',
        imgs: ['table12.13-3.png']
      },
    },
  },
  '12.14': {
    title: "Simplified Alternative Structural Design Criteria For Simple Bearing Wall or Building Frame Systems",
    subsections: {
      '12.14.1': {
        title: 'General',
        imgs: ['12.14.1.1_1.png', '12.14.1.1_2.png', '12.14.1.1_3.png', '12.14.1.1_4.png', '12.14.1.2.png', '12.14.1.3.png', '12.14.1.4_1.png', '12.14.1.4_2.png', 'table12.14-1_1.png', 'table12.14-1_2.png', 'table12.14-1_3.png']
      },
      'table12.14-1' : {
        title: 'Design Coefficients and Factors for Seismic Force-Resisting Systems for Simplified Design Procedure',
        imgs: ['table12.14-1_1.png', 'table12.14-1_2.png', 'table12.14-1_3.png']
      },
      '12.14.2': {
        title: 'Design Basis',
        imgs: ['12.14.2.png']
      },
      '12.14.3': {
        title: 'Seismic Load Effects',
        imgs: ['12.14.3.png', '12.14.3.1_1.png', '12.14.3.1_2.png', '12.14.3.2_1.png', '12.14.3.2_2.png', '12.14.3.2_3.png', '12.14.3.2_4.png', '12.14.3.2_5.png']
      },
      '12.14.4': {
        title: 'Seismic Force-Resisting System',
        imgs: ['12.14.4.1_1.png', '12.14.4.1_2.png', '12.14.4.2.png']
      },
      '12.14.5': {
        title: 'Diaphragm Flexibility',
        imgs: ['12.14.5.png']
      },
      '12.14.6': {
        title: 'Application of Loading',
        imgs: ['12.14.6.png']
      },  
      '12.14.7': {
        title: 'Design and Detailing Requirements',
        imgs: ['12.14.7.png', '12.14.7.1_1.png', '12.14.7.1_2.png', '12.14.7.2.png', '12.14.7.3.png', '12.14.7.4.png', '12.14.7.5_1.png', '12.14.7.5_2.png', '12.14.7.5_3.png', '12.14.7.6.png', '12.14.7.7.png']
      },
      '12.14.8': {
        title: 'Simplified Lateral Force Analysis Procedure',
        imgs: ['12.14.8.png', '12.14.8.1_1.png', '12.14.8.1_2.png', '12.14.8.1_3.png', '12.14.8.2.png', '12.14.8.3.png', '12.14.8.4.png', '12.14.8.5.png']
      },  
    },
  },
  '12.15': {
    title: "Consensus Standards and Other Referenced Documents",
    imgs: ['12.15.png']
  }
};

export { sections };
