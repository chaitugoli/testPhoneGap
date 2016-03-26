 /**
 * Created by vgoli on 2/18/16.
 */

var vlan_config = [
    {
        environment:[
            {
                name:'ttdiag-stage',
                datacenters:[
                {
                    name:'Mock Frankfurt',
                    aggregation_name:'mock_frankfurt',
                    id:1,
                    url:'http://boltapi-us-east-1.ttdiag-stage.trade.tt/',
                    vlan_id:[
                        {type:'ingress',graph:'mkfr-chi',params_id: '250-1691',label:'Mkfr-Chi Ingress'},
                        {type:'egress',graph:'mkfr-chi',params_id: '260-1691',label:'Mkfr-Chi Egress'}
                    ],
                    connections:[
                        {label:'Mock Frankfurt',id:1, graph:'mkfr-chi'}
                    ]
                }]
            },
            {
                name:'ttdiag-prod',
                datacenters:[
                    {
                        name:'Aurora',
                        aggregation_name:'aurora',
                        id:1,
                        url:'http://boltapi-us-east-1.ttdiag.trade.tt/',
                        vlan_id:[
                            {id:1,type:'ingress',graph:'aurora-chi',params_id: '130-1690,130-1691,130-1692,150-1690,150-1691,150-1692',label:'Aur-Chi Ingress'},
                            {id:2,type:'egress',graph:'aurora-chi',params_id: '140-1690,140-1691,140-1692,160-1690,160-1691,160-1692',label:'Aur-Chi Egress'}
                        ],
                        connections:[
                            {label:'Aurora - Chicago',id:1, graph:'aurora-chi'}
                        ]
                    },
                    {
                        name:'Chicago',
                        aggregation_name:'chicago',
                        id:3,
                        url:'http://boltapi-us-east-1.ttdiag.trade.tt/',
                        vlan_id:[
                            {id:1,type:'ingress',graph:'chicago-aur',params_id: '90-1691,90-1692,110-1691,110-1692',label:'Chi-Aur Ingress'},
                            {id:2,type:'egress',graph:'chicago-aur',params_id: '100-1691,100-1692,120-1691,120-1692',label:'Chi-Aur Egress'},
                            {id:3,type:'ingress',graph:'chicago-sy',params_id: '90-271,110-271',label:'Chi-Sy Ingress'},
                            {id:4,type:'egress',graph:'chicago-sy',params_id: '100-271,120-271',label:'Chi-Sy Egress'},
                            {id:5,type:'ingress',graph:'chicago-ny',params_id: '90-318,90-322,110-318,110-322',label:'Chi-Ny Ingress'},
                            {id:6,type:'egress',graph:'chicago-ny',params_id: '100-318,100-322,120-318,120-322',label:'Chi-Ny Egress'},
                            {id:7,type:'ingress',graph:'chicago-ty',params_id: '90-391,110-391',label:'Chi-Ty Ingress'},
                            {id:8,type:'egress',graph:'chicago-ty',params_id: '100-391,120-391',label:'Chi-Ty Egress'}
                        ],
                        connections:[
                            {label:'Chicago - Aurora',id:1, graph:'chicago-aur'},
                            {label:'Chicago - Sydney',id:2, graph:'chicago-sy'},
                            {label:'Chicago - Newyork',id:3, graph:'chicago-ny'},
                            {label:'Chicago - Tokyo',id:4, graph:'chicago-ty'}
                        ]
                    },
                    {
                        name:'Frankfurt',
                        aggregation_name:'frankfurt',
                        id:4,
                        url:'http://boltapi-eu-west-1.ttdiag.trade.tt/',
                        vlan_id:[
                            {id:1,type:'ingress',graph:'frankfurt-ny',params_id: '130-321,130-323,150-321,150-323',label:'Fr-Ny Ingress'},
                            {id:2,type:'egress',graph:'frankfurt-ny',params_id: '140-321,140-323,160-321,160-323',label:'Fr-Ny Egress'}
                        ],
                        connections:[
                            {label:'Frankfurt - Newyork',id:1, graph:'frankfurt-ny'}
                        ]
                    },
                     {
                        name:'New York',
                        id:2,
                        aggregation_name:'new_york',
                        url:'http://boltapi-us-east-1.ttdiag.trade.tt/',
                        vlan_id:[
                            {id:1,type:'ingress',graph:'newyork-chi',params_id: '130-318,130-322,150-318,150-322',label:'Ny-Chi Ingress'},
                            {id:2,type:'egress',graph:'newyork-chi',params_id: '140-318,140-322,160-318,160-322',label:'Ny-Chi Egress'},
                            {id:3,type:'ingress',graph:'newyork-fr',params_id: '130-321,130-323,150-321,150-323',label:'Ny-Fr Ingress'},
                            {id:4,type:'egress',graph:'newyork-fr',params_id: '140-321,140-323,160-321,160-323',label:'Ny-Fr Egress'}
                        ],
                        connections:[
                            {label:'New York - Chicago',id:1, graph:'newyork-chi'},
                            {label:'New York - Frankfurt',id:2, graph:'newyork-fr'}
                        ]
                    },
                    {
                        name:'Singapore',
                        aggregation_name:'singapore',
                        id:5,
                        url:'http://boltapi-ap-northeast-1.ttdiag.trade.tt/',
                        vlan_id:[
                            {id:1,type:'ingress',graph:'singapore-sy',params_id: '170-391,170-392,190-391,190-392',label:'Sg-Sy Ingress'},
                            {id:2,type:'egress',graph:'singapore-sy',params_id: '180-391,180-392,200-391,200-392',label:'Sg-Sy Egress'},
                            {id:3,type:'ingress',graph:'singapore-ty',params_id: '170-393,190-393',label:'Sg-Ty Ingress'},
                            {id:4,type:'egress',graph:'singapore-ty',params_id: '180-393,200-393',label:'Sg-Ty Egress'}
                        ],
                        connections:[
                            {label:'Singapore - Sydney',id:1, graph:'singapore-sy'},
                            {label:'Singapore - Tokyo',id:2, graph:'singapore-ty'}
                        ]
                    },{
                        name:'Sydney',
                        aggregation_name:'sydney',
                        id:6,
                        url:'http://boltapi-ap-northeast-1.ttdiag.trade.tt/',
                        vlan_id:[
                            {id:1,type:'ingress',graph:'sydney-sg',params_id: '170-391,170-392,190-391,190-392',label:'Sy-Sg Ingress'},
                            {id:2,type:'egress',graph:'sydney-sg',params_id: '180-391,180-392,200-391,200-392',label:'Sy-Sg Egress'},
                            {id:3,type:'ingress',graph:'sydney-ty',params_id: '170-398,190-398',label:'Sy-Ty Ingress'},
                            {id:4,type:'egress',graph:'sydney-ty',params_id: '180-398,200-398',label:'Sy-Ty Egress'},
                            {id:5,type:'ingress',graph:'sydney-chi',params_id: '170-271,190-271',label:'Sy-Chi Ingress'},
                            {id:6,type:'egress',graph:'sydney-chi',params_id: '180-271,200-271',label:'Sy-Chi Egress'}
                        ],
                        connections:[
                            {label:'Sydney - Singapore',id:1, graph:'sydney-sg'},
                            {label:'Sydney - Tokyo',id:2, graph:'sydney-ty'},
                            {label:'Sydney - Chicago',id:2, graph:'sydney-chi'}
                        ]
                    },
                    // {
                    //    name:'Tokyo',
                    //    id:7,
                    //    aggregation_name:'tokyo',
                    //    url:'http://boltapi-ap-northeast-1.ttdiag.trade.tt/',
                    //    vlan_id:[
                    //        {id:1,type:'ingress',graph:'tokyo-sg',params_id: '121',label:'Tokyo-Sg Ingress'},
                    //        {id:2,type:'egress',graph:'tokyo-sg',params_id: '122',label:'Tokyo-Sg Egress'},
                    //        {id:3,type:'ingress',graph:'tokyo-sy',params_id: '123',label:'Tokyo-Sy Ingress'},
                    //        {id:4,type:'egress',graph:'tokyo-sy',params_id: '124',label:'Tokyo-Sy Egress'},
                    //        {id:5,type:'ingress',graph:'tokyo-chi',params_id: '125',label:'Tokyo-Chi Ingress'},
                    //        {id:6,type:'egress',graph:'tokyo-chi',params_id: '126',label:'Tokyo-Chi Egress'}
                    //    ],
                    //    connections:[
                    //        {label:'Tokyo - Singapore',id:1, graph:'tokyo-sg'},
                    //        {label:'Tokyo - Sydney',id:2, graph:'tokyo-sy'},
                    //        {label:'Tokyo - Chicago',id:2, graph:'tokyo-chi'}
                    //    ]
                    //}
                ]
            },
            {
                name:'local',
                datacenters:[
                    {
                        name:'Aurora',
                        aggregation_name:'aurora',
                        id:1,
                        url:'http://boltapi-us-east-1.ttdiag.trade.tt/',
                        vlan_id:[
                            {id:1,type:'ingress',graph:'aurora-chi',params_id: '130-1690,130-1691,130-1692,150-1690,150-1691,150-1692',label:'Aur-Chi Ingress'},
                            {id:2,type:'egress',graph:'aurora-chi',params_id: '140-1690,140-1691,140-1692,160-1690,160-1691,160-1692',label:'Aur-Chi Egress'}
                        ],
                        connections:[
                            {label:'Aurora - Chicago',id:1, graph:'aurora-chi'}
                        ]
                    },
                    {
                        name:'Chicago',
                        aggregation_name:'chicago',
                        id:3,
                        url:'http://boltapi-us-east-1.ttdiag.trade.tt/',
                        vlan_id:[
                            {id:1,type:'ingress',graph:'chicago-aur',params_id: '90-1691,90-1692,110-1691,110-1692',label:'Chi-Aur Ingress'},
                            {id:2,type:'egress',graph:'chicago-aur',params_id: '100-1691,100-1692,120-1691,120-1692',label:'Chi-Aur Egress'},
                            {id:3,type:'ingress',graph:'chicago-sy',params_id: '90-271,110-271',label:'Chi-Sy Ingress'},
                            {id:4,type:'egress',graph:'chicago-sy',params_id: '100-271,120-271',label:'Chi-Sy Egress'},
                            {id:5,type:'ingress',graph:'chicago-ny',params_id: '90-318,90-322,110-318,110-322',label:'Chi-Ny Ingress'},
                            {id:6,type:'egress',graph:'chicago-ny',params_id: '100-318,100-322,120-318,120-322',label:'Chi-Ny Egress'},
                            {id:7,type:'ingress',graph:'chicago-ty',params_id: '90-391,110-391',label:'Chi-Ty Ingress'},
                            {id:8,type:'egress',graph:'chicago-ty',params_id: '100-391,120-391',label:'Chi-Ty Egress'}
                        ],
                        connections:[
                            {label:'Chicago - Aurora',id:1, graph:'chicago-aur'},
                            {label:'Chicago - Sydney',id:2, graph:'chicago-sy'},
                            {label:'Chicago - Newyork',id:3, graph:'chicago-ny'},
                            {label:'Chicago - Tokyo',id:4, graph:'chicago-ty'}
                        ]
                    },
                    //{
                    //    name:'Frankfurt',
                    //    aggregation_name:'frankfurt',
                    //    id:4,
                    //    url:'http://boltapi-eu-west-1.ttdiag.trade.tt/',
                    //    vlan_id:[
                    //        {id:1,type:'ingress',graph:'frankfurt-ny',params_id: '115',label:'Frankfurt-Ny Ingress'},
                    //        {id:2,type:'egress',graph:'frankfurt-ny',params_id: '116',label:'Frankfurt-Ny Egress'}
                    //    ],
                    //    connections:[
                    //        {label:'Frankfurt - Newyork',id:1, graph:'frankfurt-ny'}
                    //    ]
                    //},
                     {
                        name:'New York',
                        id:2,
                        aggregation_name:'new_york',
                        url:'http://boltapi-us-east-1.ttdiag.trade.tt/',
                        vlan_id:[
                            {id:1,type:'ingress',graph:'newyork-chi',params_id: '130-318,130-322,150-318,150-322',label:'Ny-Chi Ingress'},
                            {id:2,type:'egress',graph:'newyork-chi',params_id: '140-318,140-322,160-318,160-322',label:'Ny-Chi Egress'},
                            {id:3,type:'ingress',graph:'newyork-fr',params_id: '130-321,130-323,150-321,150-323',label:'Ny-Fr Ingress'},
                            {id:4,type:'egress',graph:'newyork-fr',params_id: '140-321,140-323,160-321,160-323',label:'Ny-Fr Egress'}
                        ],
                        connections:[
                            {label:'New York - Chicago',id:1, graph:'newyork-chi'},
                            {label:'New York - Frankfurt',id:2, graph:'newyork-fr'}
                        ]
                    },
                    //{
                    //    name:'Singapore',
                    //    aggregation_name:'singapore',
                    //    id:5,
                    //    url:'http://boltapi-ap-northeast-1.ttdiag.trade.tt/',
                    //    vlan_id:[
                    //        {id:1,type:'ingress',graph:'singapore-sy',params_id: '117',label:'Singapore-Sy Ingress'},
                    //        {id:2,type:'egress',graph:'singapore-sy',params_id: '118',label:'Singapore-Sy Egress'},
                    //        {id:3,type:'ingress',graph:'singapore-ty',params_id: '119',label:'Singapore-Ty Ingress'},
                    //        {id:4,type:'egress',graph:'singapore-ty',params_id: '120',label:'Singapore-Ty Egress'}
                    //    ],
                    //    connections:[
                    //        {label:'Singapore - Sydney',id:1, graph:'singapore-sy'},
                    //        {label:'Singapore - Tokyo',id:2, graph:'singapore-ty'}
                    //    ]
                    //},{
                    //    name:'Sydney',
                    //    aggregation_name:'sydney',
                    //    id:6,
                    //    url:'http://boltapi-ap-northeast-1.ttdiag.trade.tt/',
                    //    vlan_id:[
                    //        {id:1,type:'ingress',graph:'sydney-sg',params_id: '121',label:'Sydney-Sg Ingress'},
                    //        {id:2,type:'egress',graph:'sydney-sg',params_id: '122',label:'Sydney-Sg Egress'},
                    //        {id:3,type:'ingress',graph:'sydney-ty',params_id: '123',label:'Sydney-Ty Ingress'},
                    //        {id:4,type:'egress',graph:'sydney-ty',params_id: '124',label:'Sydney-Ty Egress'},
                    //        {id:5,type:'ingress',graph:'sydney-chi',params_id: '125',label:'Sydney-Chi Ingress'},
                    //        {id:6,type:'egress',graph:'sydney-chi',params_id: '126',label:'Sydney-Chi Egress'}
                    //    ],
                    //    connections:[
                    //        {label:'Sydney - Singapore',id:1, graph:'sydney-sg'},
                    //        {label:'Sydney - Tokyo',id:2, graph:'sydney-ty'},
                    //        {label:'Sydney - Chicago',id:2, graph:'sydney-chi'}
                    //    ]
                    //},{
                    //    name:'Tokyo',
                    //    id:7,
                    //    aggregation_name:'tokyo',
                    //    url:'http://boltapi-ap-northeast-1.ttdiag.trade.tt/',
                    //    vlan_id:[
                    //        {id:1,type:'ingress',graph:'tokyo-sg',params_id: '121',label:'Tokyo-Sg Ingress'},
                    //        {id:2,type:'egress',graph:'tokyo-sg',params_id: '122',label:'Tokyo-Sg Egress'},
                    //        {id:3,type:'ingress',graph:'tokyo-sy',params_id: '123',label:'Tokyo-Sy Ingress'},
                    //        {id:4,type:'egress',graph:'tokyo-sy',params_id: '124',label:'Tokyo-Sy Egress'},
                    //        {id:5,type:'ingress',graph:'tokyo-chi',params_id: '125',label:'Tokyo-Chi Ingress'},
                    //        {id:6,type:'egress',graph:'tokyo-chi',params_id: '126',label:'Tokyo-Chi Egress'}
                    //    ],
                    //    connections:[
                    //        {label:'Tokyo - Singapore',id:1, graph:'tokyo-sg'},
                    //        {label:'Tokyo - Sydney',id:2, graph:'tokyo-sy'},
                    //        {label:'Tokyo - Chicago',id:2, graph:'tokyo-chi'}
                    //    ]
                    //}
                ]
            }
        ]
    }

];

 var streams_config = [];


