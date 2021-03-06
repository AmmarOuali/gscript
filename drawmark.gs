*
* Help is in the end of this script
*
function drawmark( args )

  _version='0.01b1'

  if( args = '' )
    help()
    return
  endif

***** Default value
  name  = 'none'
  xpos  = 'none'
  ypos  = 'none'
  size  = 'none'
  angle = 0


***** Arguement *****
  i = 1
  while( 1 )
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while( 1 )
*** option
      if( arg = '-angle' ) ; angle=subwrd(args,i) ; i=i+1 ; break ; endif

*** name, xpos, ypos, size
      if( name = 'none' )
        name = arg
        break
      endif
      if( valnum(arg) != 0 & xpos = 'none' )
        xpos = arg
        break
      endif
      if( valnum(arg) != 0 & ypos = 'none' )
        ypos = arg
        break
      endif
      if( valnum(arg) != 0 & size = 'none' )
        size = arg
        break
      endif

      say 'syntax error: 'arg
      return
    endwhile
  endwhile

  if( size = 'none' ) ; size = 1 ; endif

* virtual coordinate: [-0.5,-0,5]-[0.5:0.5]
  if( name = 'triangle' )
    tmpred = math_sqrt(3.0)/3.0*2
    x.1 = -0.5/tmpred ; y.1 = -math_sqrt(3.0)/6.0/tmpred
    x.2 =  0.5/tmpred ; y.2 = -math_sqrt(3.0)/6.0/tmpred
    x.3 =  0.0/tmpred ; y.3 = math_sqrt(3.0)/3.0/tmpred
    x.4 =  999 ; y.4 = 999
  endif
  if( name = 'rectangle' )
    x.1 = -0.4 ; y.1 = -0.4
    x.2 =  0.4 ; y.2 = -0.4
    x.3 =  0.4 ; y.3 =  0.4
    x.4 = -0.4 ; y.4 =  0.4
    x.5 =  999 ; y.5 = 999
  endif

* size
  if( size != 0 )
    i = 1
    while( x.i != 999 & y.i != 999 )
      x.i = x.i * size
      y.i = y.i * size
      i = i + 1
    endwhile
  endif

* rotate
  if( angle != 0 )
    d2r = 4.0 * math_atan(1.0) / 180.0
    i = 1
    while( x.i != 999 & y.i != 999 )
      xtmp = x.i * math_cos(angle*d2r) - y.i * math_sin(angle*d2r)
      ytmp = x.i * math_sin(angle*d2r) + y.i * math_cos(angle*d2r)
      x.i = xtmp
      y.i = ytmp
      i = i + 1
    endwhile
  endif

* draw
  str = ''
  i = 1
  while( x.i != 999 & y.i != 999 )
    str = str % x.i+xpos % ' ' % y.i+ypos % ' '
    i = i + 1
  endwhile
  'drawpoly 'str

return

*
* help
*
function help()
  say ' Name:'
  say '   drawmark '_version' - draw mark'
  say ' '
  say ' Usage:'
  say '   drawmark mark-name x y [size] [-angle angle]'
  say ' '
  say '     x, y : positions'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2016 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
