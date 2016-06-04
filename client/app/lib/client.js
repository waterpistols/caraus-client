import React from 'react';

export default function client (target, key) {
    if (typeof window === 'undefined') {
        var style = {
            display:'none'
        };
        
        target.prototype.render = function() {
            return (
                <span style={style}>
                    {target.name} - client only
                </span>
            )
        }
    }
}