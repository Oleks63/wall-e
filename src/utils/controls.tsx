import {folder} from 'leva'

export const controls = {
  Robot: folder(
      {
        robotPath: {
          value: 'models/avatars/robot/robot-idle.glb',
          label: 'Model',
          options: {
            Robot: 'models/avatars/robot/robot-idle.glb',
          },
        },
        robotAnimPath: {
          value: 'models/avatars/robot/robot-idle.glb',
          label: 'Animation',
          options: {
            Idle: 'models/avatars/robot/robot-idle.glb',
            Backflip: 'models/avatars/robot/backflip.glb',
            ForwardFlip: 'models/avatars/robot/forward-flip.glb',
            Jump: 'models/avatars/robot/jump.glb',
            LookAround: 'models/avatars/robot/look-around.glb',
            Run: 'models/avatars/robot/run.glb',
            RunBackward: 'models/avatars/robot/run-backward.glb',
            StrafeLeft: 'models/avatars/robot/strafe-left.glb',
            StrafeRight: 'models/avatars/robot/strafe-right.glb',
            WalkingBackwards: 'models/avatars/robot/walking-backwards.glb',
          },
        },
        showRobotAnim: {value: false, label: 'Enable / Disable Animation'},
      },
      {collapsed: true},
  )
}
