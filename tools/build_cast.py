from pathlib import Path
from PIL import Image
import numpy as np,cv2,json,math
base=Path(__file__).resolve().parents[1]
# Coordinates read from the generated-image review grid. All images use a 2:3 frame.
configs={
'cactus':(.5,.68,.5,.47,.5,.29,.35,.41,.20,.34,.12,.25,.65,.41,.80,.34,.86,.25,.43,.76,.42,.86,.39,.88,.55,.76,.56,.86,.59,.88),
'cloud':(.5,.50,.5,.42,.5,.32,.25,.46,.17,.52,.11,.58,.75,.46,.83,.52,.89,.58,.42,.55,.39,.64,.35,.70,.58,.55,.61,.64,.65,.70),
'frog':(.5,.57,.5,.40,.5,.24,.36,.37,.27,.47,.19,.57,.64,.37,.73,.47,.81,.57,.40,.62,.38,.75,.34,.83,.60,.62,.62,.75,.66,.83),
'ghost':(.5,.58,.5,.39,.5,.26,.32,.40,.23,.47,.13,.54,.68,.40,.77,.47,.87,.54,.43,.70,.42,.77,.39,.81,.57,.70,.58,.77,.61,.81),
'mushroom':(.5,.65,.5,.49,.5,.29,.31,.55,.25,.61,.19,.65,.69,.55,.75,.61,.81,.65,.38,.70,.36,.78,.32,.82,.62,.70,.64,.78,.68,.82),
'pear':(.5,.61,.5,.45,.5,.31,.28,.45,.20,.53,.13,.61,.72,.45,.80,.53,.87,.61,.39,.67,.37,.77,.34,.80,.61,.67,.63,.77,.66,.80),
'pencil':(.5,.63,.5,.43,.5,.20,.41,.43,.34,.51,.29,.59,.59,.43,.66,.51,.71,.59,.44,.73,.42,.82,.39,.88,.56,.73,.58,.82,.61,.88),
'robot':(.5,.59,.5,.40,.5,.22,.29,.37,.21,.48,.14,.61,.71,.37,.79,.48,.86,.61,.39,.60,.36,.74,.32,.86,.61,.60,.64,.74,.68,.86),
'star':(.5,.51,.5,.39,.5,.27,.31,.43,.23,.50,.15,.59,.69,.43,.77,.50,.85,.59,.41,.55,.36,.70,.31,.79,.59,.55,.64,.70,.69,.79),
 'teapot':(.5,.57,.5,.43,.5,.31,.27,.47,.21,.55,.15,.63,.73,.47,.79,.55,.85,.63,.42,.60,.41,.69,.38,.75,.58,.60,.59,.69,.62,.75)
}
names=['hip','spine','head','lshoulder','lelbow','lhand','rshoulder','relbow','rhand','lhip','lknee','lfoot','rhip','rknee','rfoot']
parents=[None,'hip','spine','spine','lshoulder','lelbow','spine','rshoulder','relbow','hip','lhip','lknee','hip','rhip','rknee']
for index,(name,coords) in enumerate(configs.items()):
 p=base/'assets/cast'/f'{name}.png';im=Image.open(p).convert('RGBA');im.thumbnail((400,600));a=np.array(im);rgb=a[:,:,:3].astype(float);bg=np.median(np.concatenate([rgb[:5].reshape(-1,3),rgb[-5:].reshape(-1,3)]),axis=0)
 mask=(np.linalg.norm(rgb-bg,axis=2)<65).astype('uint8');n,labels,stats,cent=cv2.connectedComponentsWithStats(mask,8);border=np.unique(np.concatenate([labels[0],labels[-1],labels[:,0],labels[:,-1]]));remove=np.isin(labels,border[border!=0]);a[remove,3]=0
 cut=base/'assets/cast'/f'{name}-cutout.png';Image.fromarray(a).save(cut)
 w,h=im.size;joints=[dict(name=n,x=round(coords[i*2]*w),y=round(coords[i*2+1]*h),parent=parents[i])for i,n in enumerate(names)]
 duration=2.4+index*.12;tracks={}
 # modest loop-safe individual motion, differing phase/tempo by character
 for joint,amp,phase in [('hip',2,0),('spine',3,.3),('head',-4,.7),('lshoulder',9,0),('lelbow',7,.5),('rshoulder',-9,.7),('relbow',6,1),('lhip',3,.2),('rhip',-3,.2)]:
  tracks[joint]=[dict(t=round(i/32*duration,4),rot=round(amp*(math.sin(i/32*2*math.pi+phase)-math.sin(phase)),3),**({'dy':round(-4*(1-math.cos(i/32*2*math.pi)),3)} if joint=='hip' else {}))for i in range(33)]
 obj=dict(v=2,name=name.title(),size=[w,h],image=f'assets/cast/{name}-cutout.png',joints=joints,animation=dict(duration=duration,tracks=tracks))
 (base/'projects/cast'/f'{name}.json').write_text(json.dumps(obj))
