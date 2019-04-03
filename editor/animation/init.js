//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {
        function evenlySpacedTreesCanvas(dom, input, data) {

            if (! data) {
                return
            }

            const result = data.ext.result
            const addition = data.ext.explanation

            /*----------------------------------------------*
             *
             * attr
             *
             *----------------------------------------------*/
            const attr = {
                tree: {
                    existing: {
                        'fill': 'black',
                        'stroke-width': '0.1px',
                        'stroke': 'black',
                    },
                    additional: {
                        'stroke': '#F0801A',
                        'stroke-width': '0.6px',
                        'fill': '#FABA00',
                    }
                },
            }

            /*----------------------------------------------*
             *
             * paper
             *
             *----------------------------------------------*/
            let max_width = 350
            const os = 10
            const height = 40
            const tree_width = 4
            const SIZE = (max_width - os*2 - tree_width) 
                        / Math.max(input[input.length-1])
            const paper = Raphael(dom, max_width, height+os*2)

            /*----------------------------------------------*
             *
             * line
             *
             *----------------------------------------------*/
            // number line
            paper.path(['M', os + tree_width/2, os+height-10, 
                        'l', max_width-os*2-tree_width, 0].join(' '))

            // trees
            if (result) {
                draw_tree(addition, 5, attr.tree.additional, false)
            }
            draw_tree(input, 8, attr.tree.existing, true)

            // existing trees
            function draw_tree(nums, stem, attr, existing) {
                nums.forEach(x=>{
                    paper.path(['M', os+SIZE*x+tree_width/2, 
                        os+height-15, 'l', 0, stem].join(' '))
                    paper.path([
                        'M', os+SIZE*x+tree_width/2, 
                        os, 'l', 2, height-15, 'l', -4, 0,'z'
                    ].join(' ')).attr(attr)

                    if (existing) {
                        paper.text(os+SIZE*x+tree_width/2, height+10, x)
                    }
                })
            }
        }

        var $tryit;
        var io = new extIO({
            multipleArguments: false,
            functions: {
                js: 'evenlySpacedTrees',
                python: 'evenly_spaced_trees'
            },
            animation: function($expl, data){
                evenlySpacedTreesCanvas(
                    $expl[0],
                    data.in,
                    data,
                );
            }
        });
        io.start();
    }
);
