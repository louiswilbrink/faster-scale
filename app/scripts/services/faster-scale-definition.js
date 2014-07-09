'use strict';

/**
 * @ngdoc service
 * @name fasterScaleApp.fasterScaleDefinition
 * @description
 * # fasterScaleDefinition
 * Constant in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
  .constant('FasterScaleDefinition', [
    {
      name: 'Restoration',
      behaviors: [
        {
          id: 'REST001',
          description: 'Accepting life on God\'s terms, with trust, grace, mercy, vulnerability and gratitude'
        },
        {
          id: 'REST002',
          description: 'No current secrets'
        },
        {
          id: 'REST003',
          description: 'Working to resolve problems'
        }
      ]
    },
    {
      name: 'Forgetting Priorities',
      behaviors: [
        {
          id: 'F001',
          description: 'Start believing the present circumstances and moving away from trusting God.  Denial, flight, a change in what\'s important.  How you spend your time, energy and thoughts'
        },
        {
          id: 'F002',
          description: 'Secrets'
        },
        {
          id: 'F003',
          description: 'less time/energy for God, meetings, church'
        }
      ]
    },
    {
      name: 'Anxiety',
      behaviors: [
        {
          id: 'A001',
          description: 'A growing background noise of undefined fear; getting energy from emotions'
        }
      ]
    },
    {
      name: 'Speeding Up',
      behaviors: [
        {
          id: 'S001',
          description: 'Trying to outrun the anxiety which is usually the first sign of depression'
        }
      ]
    },
    {
      name: 'Ticked Off',
      behaviors: [
        {
          id: 'T001',
          description: 'Getting adrenaline high on anger and aggression'
        }
      ]
    },
    {
      name: 'Exhausted',
      behaviors: [
        {
          id: 'E001',
          description: 'Loss of physical and emotional energy; coming off the adrenaline high and the onset of depression'
        }
      ]
    },
    {
      name: 'Relapse/Moral Failure',
      behaviors: [
        {
          id: 'RMF001',
          description: 'Returning to the place you swore you would never go again. Coping with life on your terms.  You sitting in the driver\'s seat instead of God.'
        }
      ]
    }
  ]);
